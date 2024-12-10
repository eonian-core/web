import { tokenToCoinGeckoId } from '../token-symbol-to-id'
import { makeCoinGeckoRequest } from '../make-coingecko-request'
import type { PriceData, TokenSymbol } from '@/types'

const ONE_HOUR = 3600 // in seconds

const cacheBySymbol: Partial<Record<TokenSymbol, { ts: number; data: PriceData[] }>> = {}

function toYearPriceUrl(symbol: TokenSymbol) {
  return `https://api.coingecko.com/api/v3/coins/${tokenToCoinGeckoId[symbol]}/market_chart?vs_currency=usd&days=365&interval=daily`
}

/**
 * Returns the prices of the token from the start of the year (365 days ago).
 * Can be invoken only on server side.
 */
export async function getYearPriceHistorical(symbol: TokenSymbol, revalidate = ONE_HOUR): Promise<PriceData[]> {
  const cache = cacheBySymbol[symbol]
  if (!!cache && Date.now() - cache.ts < ONE_HOUR * 1000)
    return cache.data

  const url = toYearPriceUrl(symbol)
  const result = await makeCoinGeckoRequest<{ prices: Array<[number, number]> }>(url, revalidate)

  const { prices } = result
  if (!prices || !Array.isArray(prices) || prices.length === 0 || prices[0].length !== 2)
    throw new Error(`Unexpected response from ${url}, got: ${JSON.stringify(result)}`)

  const data = prices.map(([timestamp, price]): PriceData => ({ timestamp, price }))

  cacheBySymbol[symbol] = { ts: Date.now(), data }

  return data
}
