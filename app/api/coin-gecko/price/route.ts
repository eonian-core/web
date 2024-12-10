import { type NextRequest } from 'next/server'
import { getPriceOfTokens } from './get-current-price'
import { PRICE_CACHE_TIMEOUT_SECONDS } from './constants'
import type { TokenSymbol } from '@/types'
import { TokenOrder } from '@/types'

/**
 * Returns current token(s) price
 * Url to use GET /api/coin-gecko/price?symbols=BTC,ETH
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const symbols = searchParams.get('symbols')?.split(',') as TokenSymbol[] | undefined

  if (!symbols || symbols.length === 0)
    return new Response('Param "symbols" is required, example: /api/coin-gecko/price?symbols=BTC,ETH', { status: 400 })

  for (const symbol of symbols) {
    if (!TokenOrder.includes(symbol as TokenSymbol))
      return new Response('Invalid symbol', { status: 400 })
  }

  const prices = await getPriceOfTokens(symbols, PRICE_CACHE_TIMEOUT_SECONDS)

  return Response.json(prices)
}
