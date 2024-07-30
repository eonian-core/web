import type { PriceData, TokenSymbol } from '@/types'

const tokenToCoinGeckoId: Record<TokenSymbol, string> = {
  BTCB: 'bitcoin',
  ETH: 'ethereum',
  USDT: 'tether',
  USDC: 'usd-coin',
  DAI: 'dai',
  BNB: 'binancecoin',
}

const ONE_HOUR = 3600 // in seconds

/**
 * Returns the price of the token at the start of the year (365 days ago).
 * Can be invoken only on server side.
 */
export async function getPastYearPrice(symbol: TokenSymbol, revalidate = ONE_HOUR): Promise<number> {
  const prices = await getYearPriceHistorical(symbol, revalidate)
  return prices[0].price
}

// Coingecko API can be invoken only on server side
const toYearPriceUrl = (symbol: TokenSymbol) => `https://api.coingecko.com/api/v3/coins/${tokenToCoinGeckoId[symbol]}/market_chart?vs_currency=usd&days=365&interval=daily`

export async function getYearPriceHistorical(symbol: TokenSymbol, revalidate: number): Promise<PriceData[]> {
  const url = toYearPriceUrl(symbol)
  console.log('Fetching', url)
  // will cache on NextJS level
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'x-cg-demo-api-key': getKey(),
    },
    next: {
      revalidate,
    },
  })

  if (!response.ok)
    throw new Error(`Failed to fetch ${url}, reason: ${response.statusText}`)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: { prices: Array<[number, number]> } = await response.json()
  const { prices } = result
  if (!prices || !Array.isArray(prices) || prices.length === 0 || prices[0].length !== 2)
    throw new Error(`Unexpected response from ${url}, got: ${JSON.stringify(result)}`)

  return prices.map(([timestamp, price]) => ({ timestamp, price }))
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
