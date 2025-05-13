import { JsonRpcProvider } from 'ethers'
import type { MarketRaw, UserMarketPositionRaw } from './types'
import ComptrollerABI from './abi/ComptrollerABI.json'
import CTokenABI from './abi/MarketABI.json'
import AddressBook from './address-book.json'
import ERC20ABI from '@/shared/web3/abi/ERC20.json'
import type { MulticallRequest } from '@/shared/web3/multicall/multicall'
import { Multicall } from '@/shared/web3/multicall/multicall'
import { type ChainId, getMulticallAddress, getRPCEndpoint } from '@/providers/wallet/wrappers/helpers'

export async function fetchUserPositions(
  chainId: ChainId,
  walletAddress: string,
  markets: MarketRaw[],
): Promise<UserMarketPositionRaw[]> {
  const addresses = (AddressBook as unknown as Record<ChainId, { comptroller: string }>)[chainId]
  if (!addresses)
    throw new Error(`No addresses found for chainId: ${chainId}`)

  const rpcUrl = getRPCEndpoint(chainId)
  if (!rpcUrl)
    throw new Error(`No RPC endpoint found for chainId: ${chainId}`)

  const multicallAddress = getMulticallAddress(chainId)
  const provider = new JsonRpcProvider(rpcUrl)

  const underlyingRequests: MulticallRequest[] = markets.map(market => ({
    address: market.address,
    abi: CTokenABI,
    functionName: 'underlying',
    args: [],
    allowFailure: true,
  }))

  const comptrollerRequests: MulticallRequest[] = [
    {
      address: addresses.comptroller,
      abi: ComptrollerABI,
      functionName: 'getAssetsIn',
      args: [walletAddress],
      allowFailure: true,
    },
    {
      address: addresses.comptroller,
      abi: ComptrollerABI,
      functionName: 'getAccountLiquidity',
      args: [walletAddress],
      allowFailure: true,
      takeValues: [0, 1, 2],
    },
  ]

  const baseMulticall = new Multicall(multicallAddress, provider, [...comptrollerRequests, ...underlyingRequests])
  const baseResponses = await baseMulticall.makeRequest<unknown>()

  const underlyingAddresses: string[] = []
  baseResponses.slice(comptrollerRequests.length).forEach((resp, i) => {
    if (!resp.success)
      throw new Error(`Failed to fetch underlying for market at index: ${i}`)

    underlyingAddresses.push(String(resp.data))
  })

  if (!baseResponses[0].success)
    throw new Error(`Failed to fetch assets in for comptroller at index: ${0}`)

  if (!baseResponses[1].success)
    throw new Error(`Failed to fetch account liquidity for comptroller at index: ${1}`)

  const assetsIn = baseResponses[0].data as string[]
  const [errorCode, liquidityAmount, shortfall] = baseResponses[1].data as [bigint, bigint, bigint]
  const hasLiquidity = errorCode === 0n && shortfall === 0n
  const availableForBorrowBalanceInUSD = hasLiquidity ? liquidityAmount : 0n

  const combinedRequests: MulticallRequest[] = [
    ...underlyingAddresses.map(addr => ({
      address: addr,
      abi: ERC20ABI,
      functionName: 'balanceOf',
      args: [walletAddress],
      allowFailure: true,
    })),

    ...underlyingAddresses.map((addr, idx) => ({
      address: addr,
      abi: ERC20ABI,
      functionName: 'allowance',
      args: [walletAddress, markets[idx].address],
      allowFailure: true,
    })),

    ...markets.map(market => ({
      address: market.address,
      abi: CTokenABI,
      functionName: 'getAccountSnapshot',
      args: [walletAddress],
      allowFailure: true,
      takeValues: [0, 1, 2],
    })),
  ]

  const multicall = new Multicall(multicallAddress, provider, combinedRequests)
  const responses = await multicall.makeRequest<unknown>()

  return markets.map((market, index) => {
    const walletBalanceIndex = index
    const allowanceIndex = underlyingAddresses.length + index
    const snapshotIndex = underlyingAddresses.length * 2 + index

    const walletBalanceResponse = responses[walletBalanceIndex]
    const allowanceResponse = responses[allowanceIndex]
    const snapshotResponse = responses[snapshotIndex]
    if (!walletBalanceResponse.success || !allowanceResponse.success || !snapshotResponse.success)
      throw new Error(`Failed to fetch data for market at index: ${index}`)

    const walletBalanceInUnderlying = walletBalanceResponse.data as bigint
    const allowanceInUnderlying = allowanceResponse.data as bigint

    const snapshot = snapshotResponse.data as [bigint, bigint, bigint]
    const [error, cTokenBalance, borrowBalance] = snapshot

    return {
      marketAddress: market.address,
      walletAddress,
      walletBalanceInUnderlying,
      allowanceInUnderlying,
      supplyBalanceInCToken: error === 0n ? cTokenBalance : 0n,
      borrowBalanceInUnderlying: error === 0n ? borrowBalance : 0n,
      availableForBorrowBalanceInUSD,
      isEntered: assetsIn.map(a => a.toLowerCase()).includes(market.address.toLowerCase()),
    }
  })
}
