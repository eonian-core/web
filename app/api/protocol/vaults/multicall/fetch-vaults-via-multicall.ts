import { JsonRpcProvider } from 'ethers'
import _ from 'lodash'
import { fetchAssetsViaMulticall } from './fetch-assets-via-multicall'
import { Multicall } from '@/shared'
import type { MulticallRequest, MulticallResponse } from '@/shared'
import { ChainId, getMulticallAddress, getRPCEndpoint } from '@/providers/wallet/wrappers/helpers'
import VaultABI from '@/shared/web3/abi/Vault.json'
import { getBlocksPerDay } from '@/shared/web3/blocks-per-day'
import { calculateAPYAsBN } from '@/finances/apy'
import type { Token, Vault } from '@/types'

const vaultToAddressLookupMap: Partial<Record<ChainId, string[]>> = {
  [ChainId.BSC_MAINNET]: [
    '0x03A49bc893bBBEec9181b02C2D6abD6eb8e10311', // ETH
    '0x33C29951844aAa19524F51177cF725D6A0D720d4', // BTCB
    '0xaBfCaA1c65d78C2f1D51fd796290029f976192B3', // USDT
    '0x5340f5a1B7b847Ae71865D2D7B200dc8a06a9ffC', // USDC
  ],
}

interface IntermediateVaultModel {
  name: string
  symbol: string
  asset: string
  interestRatePerBlock: bigint
  decimals: number
  fundAssets: bigint
  address: string
}

export async function getVaultsByChain(chainId: ChainId) {
  const multicallAddress = getMulticallAddress(chainId)
  const vaults = await fetchVaultsViaMulticall(chainId, multicallAddress)
  return vaults
}

/**
 * Performs several multicall requests to fetch vaults data from the chain.
 * @param chainId Current chain id.
 * @param multicallAddress Multicall contract for the specified chain.
 * @returns List of vaults deployed on the specified chain.
 */
async function fetchVaultsViaMulticall(chainId: ChainId, multicallAddress: string): Promise<Vault[]> {
  const vaults = vaultToAddressLookupMap[chainId]
  if (!vaults)
    return []

  const requests = vaults.flatMap(createVaultRequests)
  if (requests.length === 0)
    return []

  const provider = new JsonRpcProvider(getRPCEndpoint(chainId))
  const multicall = new Multicall(multicallAddress, provider, requests)
  const responses = await multicall.makeRequest()

  // Map sequence of the raw responses to intermediate vaults state
  const intermediateVaultModels = _.chain(responses)
    .chunk(createVaultRequests('-').length)
    .map((responses, index) => mapResponseToIntermediateVaultModel(vaults[index], responses))
    .compact()
    .value()

  if (intermediateVaultModels.length === 0)
    return []

  // Make another multicall request to fetch data of the underlying assets
  const tokenAddresses = intermediateVaultModels.map(model => model.asset)
  const tokenAssets = await fetchAssetsViaMulticall(chainId, multicallAddress, tokenAddresses)

  // Convert collected data into complete vault models
  return intermediateVaultModels.map(model => createVault(chainId, model, tokenAssets))
}

/**
 * Enriches the intermediate vault state to produce a completed vault model.
 */
function createVault(chainId: ChainId, intermediateVaultModel: IntermediateVaultModel, tokenAssets: Token[]): Vault {
  return {
    address: intermediateVaultModel.address,
    decimals: intermediateVaultModel.decimals,
    name: intermediateVaultModel.name,
    symbol: intermediateVaultModel.symbol,
    asset: tokenAssets.find(token => token.address === intermediateVaultModel.asset)!,
    debtRatio: 0n,
    fundAssets: intermediateVaultModel.fundAssets,
    fundAssetsUSD: 0n,
    lastReportTimestamp: 0n,
    maxBps: 0n,
    totalAssets: 0n,
    totalDebt: 0n,
    totalSupply: 0n,
    totalUtilisationRate: 0n,
    version: 'unknown',
    rates: [
      {
        perBlock: intermediateVaultModel.interestRatePerBlock,
        apy: {
          daily: computeAPY(chainId, intermediateVaultModel, 365),
          weekly: computeAPY(chainId, intermediateVaultModel, 52),
          monthly: computeAPY(chainId, intermediateVaultModel, 12),
          yearly: computeAPY(chainId, intermediateVaultModel, 1),
          decimals: intermediateVaultModel.decimals,
        },
      },
    ],
  }
}

function computeAPY(chainId: ChainId, intermediateVaultModel: IntermediateVaultModel, unitsPerYear: number): bigint {
  const blocksPerDay = getBlocksPerDay(chainId)
  const yearlyAPY = calculateAPYAsBN(
    intermediateVaultModel.interestRatePerBlock,
    intermediateVaultModel.decimals,
    blocksPerDay,
  )
  return BigInt(Math.floor(Number(yearlyAPY) / unitsPerYear))
}

/**
 * Returns a list of requests to be used in a single multicall.
 * Do not change the order, it's matter (@see {@link mapResponseToIntermediateVaultModel})
 */
function createVaultRequests(vaultAddress: string): MulticallRequest[] {
  return [
    createVaultRequest(vaultAddress, 'name', []),
    createVaultRequest(vaultAddress, 'symbol', []),
    createVaultRequest(vaultAddress, 'asset', []),
    createVaultRequest(vaultAddress, 'interestRatePerBlock', []),
    createVaultRequest(vaultAddress, 'decimals', []),
    createVaultRequest(vaultAddress, 'fundAssets', []),
  ]
}

function createVaultRequest(vaultAddress: string, functionName: string, args: unknown[]): MulticallRequest {
  return {
    abi: VaultABI,
    address: vaultAddress,
    args,
    functionName,
  }
}

/**
 * Transforms the sequence of raw multicall responses to intermediate vault state.
 * Returns null If any errors / unsuccessful responses occured.
 */
function mapResponseToIntermediateVaultModel(
  address: string,
  responses: MulticallResponse<unknown>[],
): IntermediateVaultModel | null {
  const isSuccess = responses.every(response => response.success)
  if (!isSuccess) {
    console.warn(`Error occured while fetching vault data via multicall, responses: ${JSON.stringify(responses)}`)
    return null
  }
  const data = responses.map(response => response.data)
  return {
    address,
    name: String(data[0]),
    symbol: String(data[1]),
    asset: String(data[2]),
    interestRatePerBlock: data[3] as bigint,
    decimals: Number(data[4]),
    fundAssets: data[5] as bigint,
  }
}
