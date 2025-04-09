/* eslint-disable sonarjs/cognitive-complexity */
import { Contract, JsonRpcProvider } from 'ethers'
import { Multicall } from '../../shared/web3/multicall/multicall'
import type { MulticallRequest, MulticallResponse } from '../../shared/web3/multicall/multicall'
import ERC20ABI from '../../shared/web3/abi/ERC20.json'
import type { CommonMarketData, Market } from './types'
import ComptrollerABI from './abi/ComptrollerABI.json'
import ComptrollerPriceOracleABI from './abi/ComptrollerPriceOracleABI.json'
import CTokenABI from './abi/MarketABI.json'
import AddressBook from './address-book.json'
import { type ChainId, getMulticallAddress, getRPCEndpoint } from '@/providers/wallet/wrappers/helpers'

export async function fetchMarkets(chainId: ChainId): Promise<CommonMarketData | null> {
  const addresses = (AddressBook as Record<ChainId, { comptroller: string }>)[chainId]
  if (!addresses)
    return null

  const rpcUrl = getRPCEndpoint(chainId)
  const multicallAddress = getMulticallAddress(chainId)
  const data = await performMulticalls(rpcUrl!, addresses.comptroller, multicallAddress)
  return data
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
      {
        address: marketAddress,
        abi: ERC20ABI,
        functionName: 'name',
        args: [],
        allowFailure: true,
      },
      {
        address: marketAddress,
        abi: ERC20ABI,
        functionName: 'symbol',
        args: [],
        allowFailure: true,
      },
      // Market rates and supply data
      {
        address: marketAddress,
        abi: CTokenABI,
        functionName: 'borrowRatePerBlock',
        args: [],
        allowFailure: true,
      },
      {
        address: marketAddress,
        abi: CTokenABI,
        functionName: 'supplyRatePerBlock',
        args: [],
        allowFailure: true,
      },
      {
        address: marketAddress,
        abi: CTokenABI,
        functionName: 'totalSupply',
        args: [],
        allowFailure: true,
      },
      {
        address: marketAddress,
        abi: CTokenABI,
        functionName: 'exchangeRateStored',
        args: [],
        allowFailure: true,
      },
      {
        address: marketAddress,
        abi: CTokenABI,
        functionName: 'underlying',
        args: [],
        allowFailure: true,
      },
      // Get market info from Comptroller (collateral factor)
      {
        address: comptrollerAddress,
        abi: ComptrollerABI,
        functionName: 'markets',
        args: [marketAddress],
        allowFailure: true,
        takeValues: [0, 1, 2],
      },
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

/**
 * Processes multicall responses into market objects
 * @param marketAddresses - Array of cToken addresses
 * @param dataResponses - Responses from market data multicall
 * @param priceResponses - Responses from price oracle multicall
 * @returns Array of processed market objects
 */
function processMarketResponses(
  marketAddresses: string[],
  dataResponses: MulticallResponse[],
  priceResponses: MulticallResponse[],
): Market[] {
  const markets: Market[] = []
  const requestsPerMarket = 8 // Number of requests per market in createMarketDataRequests

  for (let i = 0; i < marketAddresses.length; i++) {
    const startIdx = i * requestsPerMarket
    const address = marketAddresses[i]

    // Extract data from responses
    const nameResponse = dataResponses[startIdx]
    const symbolResponse = dataResponses[startIdx + 1]
    const borrowRateResponse = dataResponses[startIdx + 2]
    const supplyRateResponse = dataResponses[startIdx + 3]
    const totalSupplyResponse = dataResponses[startIdx + 4]
    const exchangeRateResponse = dataResponses[startIdx + 5]
    const underlyingResponse = dataResponses[startIdx + 6]
    const marketInfoResponse = dataResponses[startIdx + 7]
    const priceResponse = priceResponses[i]

    // Skip if critical data is missing
    if (!symbolResponse.success || !marketInfoResponse.success)
      continue

    const marketInfo = marketInfoResponse.data as [boolean, bigint, boolean]

    markets.push({
      address,
      name: nameResponse.success ? nameResponse.data as string : `Unknown Market ${i}`,
      symbol: symbolResponse.data as string,
      collateralFactor: marketInfo[1], // collateralFactorMantissa is at index 1
      borrowRatePerBlock: borrowRateResponse.success ? borrowRateResponse.data as bigint : 0n,
      supplyRatePerBlock: supplyRateResponse.success ? supplyRateResponse.data as bigint : 0n,
      totalSupply: totalSupplyResponse.success ? totalSupplyResponse.data as bigint : 0n,
      exchangeRateStored: exchangeRateResponse.success ? exchangeRateResponse.data as bigint : 0n,
      price: priceResponse.success ? priceResponse.data as bigint : 0n,
      underlyingAddress: underlyingResponse.success ? underlyingResponse.data as string : '0x0000000000000000000000000000000000000000',
    })
  }

  return markets
}

async function performMulticalls(
  rpcUrl: string,
  comptrollerAddress: string,
  multicallAddress: string,
): Promise<CommonMarketData> {
  // Get contract instances
  const provider = new JsonRpcProvider(rpcUrl)
  const comptroller = new Contract(comptrollerAddress, ComptrollerABI, provider)

  // Get the oracle address from the comptroller
  const oracleAddress = await comptroller.oracle() as string

  // Get all market addresses
  const marketAddresses = await comptroller.getAllMarkets() as string[]

  // Create multicall requests for market data
  const marketDataRequests = createMarketDataRequests(marketAddresses, comptrollerAddress)
  const dataMulticall = new Multicall(multicallAddress, provider, marketDataRequests)

  // Create multicall requests for price data
  const priceOracleRequests = createPriceOracleRequests(marketAddresses, oracleAddress)
  const priceMulticall = new Multicall(multicallAddress, provider, priceOracleRequests)

  // Execute both multicalls in parallel
  const [dataResponses, priceResponses] = await Promise.all([
    dataMulticall.makeRequest<unknown>(),
    priceMulticall.makeRequest<unknown>(),
  ])

  // Process responses into market objects
  const markets = processMarketResponses(marketAddresses, dataResponses, priceResponses)

  return {
    markets,
    comptrollerAddress,
    oracleAddress,
  }
}
