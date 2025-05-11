import { JsonRpcProvider } from 'ethers'
import _ from 'lodash'
import { fetchPricesViaMulticall } from './fetch-prices-via-multicall'
import { Multicall } from '@/shared'
import type { MulticallRequest, MulticallResponse } from '@/shared'
import { type ChainId, getRPCEndpoint } from '@/providers/wallet/wrappers/helpers'
import ERC20ABI from '@/shared/web3/abi/ERC20.json'
import type { Price, Token, TokenSymbol } from '@/types'

interface IntermediateAssetModel {
  name: string
  symbol: string
  address: string
  decimals: number
}

/**
 * Performs multicall request to fetch data for the specified ERC20 assets.
 * @param chainId Current chain id.
 * @param multicallAddress Multicall contract for the specified chain.
 * @param assetAddresses List of ERC20 addresses.
 * @returns List of enriched token model.
 */
export async function fetchAssetsViaMulticall(
  chainId: ChainId,
  multicallAddress: string,
  assetAddresses: string[],
): Promise<Token[]> {
  const requests = assetAddresses.flatMap(createAssetRequests)
  if (requests.length === 0)
    return []

  const provider = new JsonRpcProvider(getRPCEndpoint(chainId))
  const multicall = new Multicall(multicallAddress, provider, requests)
  const responses = await multicall.makeRequest()

  // Convert raw multicall responses to the intermediate asset model
  const intermediateAssetModels = _.chain(responses)
    .chunk(createAssetRequests('-').length)
    .map((responses, index) => mapResponseToIntermediateAssetModel(assetAddresses[index], responses))
    .compact()
    .value()

  if (intermediateAssetModels.length === 0)
    return []

  const tokenSymbols = intermediateAssetModels.map(model => model.symbol as TokenSymbol)
  const prices = await fetchPricesViaMulticall(chainId, multicallAddress, tokenSymbols)

  const tokens = intermediateAssetModels.map((model, index) => createAssetToken(model, prices[index]))
  return tokens
}

/**
 * Enriches intermediate state of the asset with price data.
 * Returns completed ERC20 token model (@see {@link Token})
 */
function createAssetToken(intermediateAssetModel: IntermediateAssetModel, price: Price): Token {
  return {
    address: intermediateAssetModel.address,
    decimals: intermediateAssetModel.decimals,
    name: intermediateAssetModel.name,
    symbol: intermediateAssetModel.symbol,
    price,
  }
}

function mapResponseToIntermediateAssetModel(address: string, responses: MulticallResponse<unknown>[]): IntermediateAssetModel | null {
  const isSuccess = responses.every(response => response.success)
  if (!isSuccess) {
    console.warn(`Error occured while fetching asset data via multicall, responses: ${JSON.stringify(responses)}`)
    return null
  }
  const data = responses.map(response => response.data)
  return {
    name: String(data[0]),
    symbol: String(data[1]),
    decimals: Number(data[2]),
    address,
  }
}

/**
 * Creates list of requests to be used in the single multicall.
 * Mind the order, it's important (@see {@link mapResponseToIntermediateAssetModel})
 */
function createAssetRequests(assetAddress: string): MulticallRequest[] {
  return [
    createAssetRequest(assetAddress, 'name', []),
    createAssetRequest(assetAddress, 'symbol', []),
    createAssetRequest(assetAddress, 'decimals', []),
  ]
}

function createAssetRequest(assetAddress: string, functionName: string, args: unknown[]): MulticallRequest {
  return {
    abi: ERC20ABI,
    address: assetAddress,
    args,
    functionName,
  }
}
