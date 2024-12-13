import { type NextRequest } from 'next/server'
import { getYearPriceHistorical } from './get-past-year-price'
import type { TokenSymbol } from '@/types'
import { TokenOrder } from '@/types'

/**
 * Returns historical token price
 * Url to use GET /api/coin-gecko/price-historical?symbol=BTC
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const symbol = searchParams.get('symbol')

  if (!symbol)
    return new Response('symbol in url is required, example /api/coin-gecko/price-historical?symbol=BTC', { status: 400 })

  if (!TokenOrder.includes(symbol as TokenSymbol))
    return new Response('Invalid symbol', { status: 400 })

  const prices = await getYearPriceHistorical(symbol as TokenSymbol)

  return Response.json({ prices })
}
