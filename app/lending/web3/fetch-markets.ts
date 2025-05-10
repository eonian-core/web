import { JsonRpcProvider } from 'ethers'
import type { MarketRaw } from './types'
import ComptrollerABI from './abi/ComptrollerABI.json'
import ComptrollerPriceOracleABI from './abi/ComptrollerPriceOracleABI.json'
import CTokenABI from './abi/MarketABI.json'
import AddressBook from './address-book.json'
import ERC20ABI from '@/shared/web3/abi/ERC20.json'
import type { MulticallRequest, MulticallResponse } from '@/shared/web3/multicall/multicall'
import { Multicall } from '@/shared/web3/multicall/multicall'
import { type ChainId, getMulticallAddress, getRPCEndpoint } from '@/providers/wallet/wrappers/helpers'

export async function fetchMarkets(chainId: ChainId): Promise<MarketRaw[]> {
  const addresses = (AddressBook as unknown as Record<ChainId, { comptroller: string }>)[chainId]
  if (!addresses)
    throw new Error(`No addresses found for chainId: ${chainId}`)

  const rpcUrl = getRPCEndpoint(chainId)
  const multicallAddress = getMulticallAddress(chainId)
  return await performMulticalls(rpcUrl!, addresses.comptroller, multicallAddress)
}

function createInitialRequests(comptrollerAddress: string): MulticallRequest[] {
  return [
    // Get oracle address
    { address: comptrollerAddress, abi: ComptrollerABI, functionName: 'oracle', args: [], allowFailure: true },
    // Get all market addresses
    { address: comptrollerAddress, abi: ComptrollerABI, functionName: 'getAllMarkets', args: [], allowFailure: true },
  ]
}

function createMarketDataRequests(
  marketAddresses: string[],
  comptrollerAddress: string,
): MulticallRequest[] {
  const requests: MulticallRequest[] = []

  // For each market address, create requests for token info, rates, and market info
  marketAddresses.forEach((marketAddress) => {
    // Basic ERC20 info (name, symbol)
    requests.push(
      { address: marketAddress, abi: ERC20ABI, functionName: 'name', args: [], allowFailure: true },
      { address: marketAddress, abi: ERC20ABI, functionName: 'symbol', args: [], allowFailure: true },
      { address: marketAddress, abi: ERC20ABI, functionName: 'decimals', args: [], allowFailure: true },
      // Market rates and supply data
      { address: marketAddress, abi: CTokenABI, functionName: 'borrowRatePerBlock', args: [], allowFailure: true },
      { address: marketAddress, abi: CTokenABI, functionName: 'supplyRatePerBlock', args: [], allowFailure: true },
      { address: marketAddress, abi: CTokenABI, functionName: 'totalSupply', args: [], allowFailure: true },
      { address: marketAddress, abi: CTokenABI, functionName: 'totalBorrows', args: [], allowFailure: true },
      { address: marketAddress, abi: CTokenABI, functionName: 'totalReserves', args: [], allowFailure: true },
      { address: marketAddress, abi: CTokenABI, functionName: 'exchangeRateStored', args: [], allowFailure: true },
      { address: marketAddress, abi: CTokenABI, functionName: 'underlying', args: [], allowFailure: true },
      { address: marketAddress, abi: CTokenABI, functionName: 'getCash', args: [], allowFailure: true },
      // Get market info from Comptroller (collateral factor)
      { address: comptrollerAddress, abi: ComptrollerABI, functionName: 'markets', args: [marketAddress], allowFailure: true, takeValues: [0, 1, 2] },
    )
  })

  return requests
}

/**
 * Creates price oracle requests for market data
 * @param marketAddresses - Array of cToken addresses
 * @param oracleAddress - Address of the price oracle
 * @returns Array of multicall requests
 */
function createPriceOracleRequests(
  marketAddresses: string[],
  oracleAddress: string,
): MulticallRequest[] {
  return marketAddresses.map(marketAddress => ({
    address: oracleAddress,
    abi: ComptrollerPriceOracleABI,
    functionName: 'getUnderlyingPrice',
    args: [marketAddress],
    allowFailure: true,
  }))
}

// Add multicall requests creator for underlying token data
function createUnderlyingTokenRequests(
  underlyingAddresses: string[],
): MulticallRequest[] {
  return underlyingAddresses.flatMap(addr => [
    { address: addr, abi: ERC20ABI, functionName: 'symbol', args: [], allowFailure: true },
    { address: addr, abi: ERC20ABI, functionName: 'name', args: [], allowFailure: true },
    { address: addr, abi: ERC20ABI, functionName: 'decimals', args: [], allowFailure: true },
  ])
}

/**
 * Processes multicall responses into market objects
 * @param marketAddresses - Array of cToken addresses
 * @param dataResponses - Responses from market data multicall
 * @param priceResponses - Responses from price oracle multicall
 * @param underlyingResponses - Responses from underlying token multicall
 * @returns Array of processed market objects
 */
function processMarketResponses(
  marketAddresses: string[],
  dataResponses: MulticallResponse[],
  priceResponses: MulticallResponse[],
  underlyingResponses: MulticallResponse[],
): MarketRaw[] {
  const markets: MarketRaw[] = []
  const requestsPerMarket = 12 // Number of requests per market in createMarketDataRequests
  const underlyingRequestsPerMarket = 3 // Number of requests per market in createUnderlyingTokenRequests

  dataResponses.forEach((resp, i) => {
    if (!resp.success)
      throw new Error(`Failed to fetch data for market of index: ${i}`)
  })

  priceResponses.forEach((resp, i) => {
    if (!resp.success)
      throw new Error(`Failed to fetch price for market of index: ${i}`)
  })

  underlyingResponses.forEach((resp, i) => {
    if (!resp.success)
      throw new Error(`Failed to fetch underlying for market of index: ${i}`)
  })

  for (let i = 0; i < marketAddresses.length; i++) {
    const startIdx = i * requestsPerMarket
    const address = marketAddresses[i]

    // Extract data from responses
    const nameResponse = dataResponses[startIdx]
    const symbolResponse = dataResponses[startIdx + 1]
    const decimalsResponse = dataResponses[startIdx + 2]
    const borrowRateResponse = dataResponses[startIdx + 3]
    const supplyRateResponse = dataResponses[startIdx + 4]
    const totalSupplyResponse = dataResponses[startIdx + 5]
    const totalBorrowsResponse = dataResponses[startIdx + 6]
    const totalReservesResponse = dataResponses[startIdx + 7]
    const exchangeRateResponse = dataResponses[startIdx + 8]
    const underlyingResponse = dataResponses[startIdx + 9]
    const cashResponse = dataResponses[startIdx + 10]
    const marketInfoResponse = dataResponses[startIdx + 11]
    const priceResponse = priceResponses[i]
    const underlyingSymbolResponse = underlyingResponses[i * underlyingRequestsPerMarket]
    const underlyingNameResponse = underlyingResponses[i * underlyingRequestsPerMarket + 1]
    const underlyingDecimalsResponse = underlyingResponses[i * underlyingRequestsPerMarket + 2]

    markets.push({
      address,
      name: String(nameResponse.data),
      symbol: String(symbolResponse.data),
      decimals: Number(decimalsResponse.data),
      collateralFactor: (marketInfoResponse.data as [boolean, bigint, boolean])[1],
      borrowRatePerBlock: borrowRateResponse.data as bigint,
      supplyRatePerBlock: supplyRateResponse.data as bigint,
      totalSupply: totalSupplyResponse.data as bigint,
      totalBorrowInUnderlying: totalBorrowsResponse.data as bigint,
      totalReservesInUnderlying: totalReservesResponse.data as bigint,
      exchangeRateStored: exchangeRateResponse.data as bigint,
      cashInUnderlying: cashResponse.data as bigint,
      price: priceResponse.data as bigint,
      underlyingAddress: String(underlyingResponse.data),
      underlyingSymbol: String(underlyingSymbolResponse.data),
      underlyingName: String(underlyingNameResponse.data),
      underlyingDecimals: Number(underlyingDecimalsResponse.data),
    })
  }

  return markets
}

async function performMulticalls(
  rpcUrl: string,
  comptrollerAddress: string,
  multicallAddress: string,
): Promise<MarketRaw[]> {
  const provider = new JsonRpcProvider(rpcUrl)

  // Create and execute initial multicall to get oracle and market addresses
  const initialRequests = createInitialRequests(comptrollerAddress)
  const initialMulticall = new Multicall(multicallAddress, provider, initialRequests)
  const initialResponses = await initialMulticall.makeRequest<unknown>()

  if (!initialResponses[0].success || !initialResponses[1].success)
    throw new Error('Failed to fetch oracle address or market addresses')

  const oracleAddress = initialResponses[0].data as string
  const marketAddresses = initialResponses[1].data as string[]

  const marketDataRequests = createMarketDataRequests(marketAddresses, comptrollerAddress)
  const dataMulticall = new Multicall(multicallAddress, provider, marketDataRequests)

  const priceOracleRequests = createPriceOracleRequests(marketAddresses, oracleAddress)
  const priceMulticall = new Multicall(multicallAddress, provider, priceOracleRequests)

  const dataResponses = await dataMulticall.makeRequest<unknown>()
  const requestsPerMarket = 12 // Number of requests per market in createMarketDataRequests

  const underlyingAddresses = marketAddresses.map((_, i) => {
    const idx = i * requestsPerMarket + 9
    const resp = dataResponses[idx]
    if (!resp.success)
      throw new Error(`Failed to fetch underlying address for market of index: ${i}`)

    return String(resp.data)
  })

  const underlyingRequests = createUnderlyingTokenRequests(underlyingAddresses)
  const underlyingMulticall = new Multicall(multicallAddress, provider, underlyingRequests)
  const [priceResponses, underlyingResponses] = await Promise.all([
    priceMulticall.makeRequest<unknown>(),
    underlyingMulticall.makeRequest<unknown>(),
  ])

  const markets = processMarketResponses(marketAddresses, dataResponses, priceResponses, underlyingResponses)

  return markets
}
