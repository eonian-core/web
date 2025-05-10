import { JsonRpcProvider } from 'ethers'
import _ from 'lodash'
import type { Price, Token } from '../../gql/graphql'
import { Multicall } from '@/shared'
import type { MulticallRequest, MulticallResponse } from '@/shared'
import { type ChainId, getRPCEndpoint } from '@/providers/wallet/wrappers/helpers'
import ERC20ABI from '@/shared/web3/abi/ERC20.json'
import { getCurrentPriceOfTokens } from '@/api/coin-gecko/price/useCurrentPriceOfTokens'
import type { TokenSymbol } from '@/types'
import { TokenOrder } from '@/types'

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

  // Fetch prices from CoinGecko. Could be temporary approach.
  // We can use multicall to get prices from on-chain (using Uniswap TWAP for example), but it's more difficult.

  // eslint-disable-next-line no-console
  console.log('fetchAssetsViaMulticall intermediateAssetModels', intermediateAssetModels.length)
  const prices = await fetchPrices(intermediateAssetModels)
  // eslint-disable-next-line no-console
  console.log('fetchAssetsViaMulticall prices', prices)
  return intermediateAssetModels.map(model => createAssetToken(model, prices))
}

/**
 * Enriches intermediate state of the asset with price data.
 * Returns completed ERC20 token model (@see {@link Token})
 */
function createAssetToken(intermediateAssetModel: IntermediateAssetModel, prices: Partial<Record<TokenSymbol, Price>>): Token {
  return {
    id: intermediateAssetModel.symbol,
    address: intermediateAssetModel.address,
    decimals: intermediateAssetModel.decimals,
    name: intermediateAssetModel.name,
    symbol: intermediateAssetModel.symbol,
    price: prices[intermediateAssetModel.symbol as TokenSymbol]!,
  }
}

/**
 * Fetches price data from CoinGecko.
 */
async function fetchPrices(intermediateAssetModels: IntermediateAssetModel[]): Promise<Partial<Record<TokenSymbol, Price>>> {
  const symbols = intermediateAssetModels.map(asset => asset.symbol) as TokenSymbol[]
  symbols.forEach((symbol) => {
    if (!TokenOrder.includes(symbol))
      throw new Error(`Cannot fetch price for unknown symbol: ${symbol}`)
  })
  // eslint-disable-next-line no-console
  console.log('fetchPrices symbols', symbols)
  const price = await getCurrentPriceOfTokens(symbols)
  return _.mapValues(price, (value, tokenSymbol): Price => {
    const decimals = 8
    return {
      id: tokenSymbol,
      decimals,
      value: BigInt(Math.floor(value! * (10 ** decimals))),
    }
  })
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
