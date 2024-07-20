import type { PriceData, TokenSymbol } from '@/types'

const tokenToCoinGeckoId: Record<TokenSymbol, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  USDT: 'tether',
  USDC: 'usd-coin',
  DAI: 'dai',
  BNB: 'binancecoin',
}

const cache: Partial<Record<TokenSymbol, [number, PriceData[]]>> = {}

export async function getYearPriceHistorical(symbol: TokenSymbol, revalidate = 1800): Promise<PriceData[]> {
  const cacheData = cache[symbol]
  if (cacheData && Date.now() - cacheData[0] < revalidate * 1000)
    return cacheData[1]

  const options = {
    headers: {
      'accept': 'application/json',
      'x-cg-demo-api-key': getKey(),
    },
    next: {
      revalidate,
    },
  }
  const url = `https://api.coingecko.com/api/v3/coins/${tokenToCoinGeckoId[symbol]}/market_chart?vs_currency=usd&days=365&interval=daily`
  const response = await fetch(url, options)

  if (!response.ok)
    throw new Error(`Failed to fetch ${url}, reason: ${response.statusText}`)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: { prices: Array<[number, number]> } = await response.json()
  const { prices } = result
  if (!prices || !Array.isArray(prices) || prices.length === 0 || prices[0].length !== 2)
    throw new Error(`Unexpected response from ${url}, got: ${JSON.stringify(result)}`)

  return prices.map(([timestamp, price]) => ({ timestamp, price }))
}

/**
 * Returns the price of the token at the start of the year (365 days ago).
 */
export async function getPastYearPrice(symbol: TokenSymbol): Promise<number> {
  const prices = await getYearPriceHistorical(symbol)
  return prices[0].price
}

const KEYS = (process.env.COINGECKO_API_KEY || '').split(',').filter(Boolean)
let index = 0

/**
 * If multiple keys are provided, this function will cycle through them.
 */
function getKey(): string {
  index = (index + 1) % KEYS.length
  return KEYS[index]
}
