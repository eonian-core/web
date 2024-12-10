import type { PriceData, TokenSymbol } from '@/types'
import { usePromise } from '@/api/use-promise'
import { getVercelHostPrefix } from '@/api/endpoints'

const ONE_HOUR = 3600 // in seconds

export interface CoinGeckoGetResponse {
  prices: PriceData[]
}

export type PastYearPrices = Record<TokenSymbol, CoinGeckoGetResponse>

export interface TokenPriceResponse extends CoinGeckoGetResponse {
  pastYearPrice: number
}

async function getHistoricalTokenPrice(symbol: TokenSymbol): Promise<TokenPriceResponse> {
  const response: Response = await fetch(`${getVercelHostPrefix()}/api/coin-gecko/price-historical?symbol=${symbol}`, {
    next: {
      revalidate: ONE_HOUR,
    },
  })
  const data = await response.json() as CoinGeckoGetResponse

  return {
    ...data,
    pastYearPrice: data.prices[0].price,
  }
}

export function useHistoricalTokenPrice(symbol: TokenSymbol) {
  // TODO: switch in future from usePromise to tanstack query, it have much better caching,
  //  but it harder to setup properly with latest version of NextJS
  return usePromise(async () => await getHistoricalTokenPrice(symbol), [symbol])
}
