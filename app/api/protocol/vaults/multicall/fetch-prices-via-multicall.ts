import { JsonRpcProvider } from 'ethers'
import { getChainLinkPriceFeedAddresses } from './addresses'
import { Multicall } from '@/shared'
import type { MulticallRequest } from '@/shared'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'
import { getRPCEndpoint } from '@/providers/wallet/wrappers/helpers'
import ChainlinkPriceFeedABI from '@/shared/web3/abi/ChainlinkPriceFeed.json'
import type { Price, TokenSymbol } from '@/types'

interface IntermediatePriceModel {
  answer: bigint
  decimals: number
  tokenSymbol: TokenSymbol
}

export async function fetchPricesViaMulticall(
  chainId: ChainId,
  multicallAddress: string,
  tokenSymbols: TokenSymbol[],
): Promise<Price[]> {
  if (tokenSymbols.length === 0)
    return []

  const requests: MulticallRequest[] = []

  // Create price feed requests for each token
  for (const tokenSymbol of tokenSymbols) {
    try {
      const priceFeedAddress = getChainLinkPriceFeedAddresses(chainId, tokenSymbol)

      // Add request for latest price data
      requests.push(createPriceFeedRequest(priceFeedAddress, 'latestRoundData', [], [0, 1, 2]))

      // Add request for decimals
      requests.push(createPriceFeedRequest(priceFeedAddress, 'decimals', []))
    }
    catch (error) {
      console.warn(`Error getting price feed address for ${tokenSymbol}: ${String(error)}`)
    }
  }

  if (requests.length === 0)
    return []

  // Execute multicall
  const provider = new JsonRpcProvider(getRPCEndpoint(chainId))
  const multicall = new Multicall(multicallAddress, provider, requests)
  const responses = await multicall.makeRequest()

  // Process responses in pairs (latestRoundData, decimals)
  const intermediateModels: IntermediatePriceModel[] = []

  for (let i = 0; i < responses.length; i += 2) {
    const tokenIndex = Math.floor(i / 2)
    if (tokenIndex >= tokenSymbols.length)
      break

    const priceResponse = responses[i]
    const decimalsResponse = responses[i + 1]

    if (!priceResponse.success || !decimalsResponse.success) {
      console.warn(`Error fetching price data for ${tokenSymbols[tokenIndex]}`)
      continue
    }

    const priceData = priceResponse.data as [bigint, bigint, bigint]
    const answer = priceData[1]
    const decimals = Number(decimalsResponse.data)

    intermediateModels.push({
      answer,
      decimals,
      tokenSymbol: tokenSymbols[tokenIndex],
    })
  }

  // Convert to Price objects
  return intermediateModels.map(createPrice)
}

/**
 * Creates a Price object from the intermediate price model.
 */
function createPrice(model: IntermediatePriceModel): Price {
  return {
    decimals: model.decimals,
    value: model.answer,
  }
}

/**
 * Creates a multicall request for the price feed contract.
 */
function createPriceFeedRequest(priceFeedAddress: string, functionName: string, args: unknown[], takeValues?: number[]): MulticallRequest {
  return {
    abi: ChainlinkPriceFeedABI,
    address: priceFeedAddress,
    args,
    functionName,
    takeValues,
  }
}
