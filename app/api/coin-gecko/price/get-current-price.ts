import _ from 'lodash'
import { coinGeckoIdToToken, tokenToCoinGeckoId } from '../token-symbol-to-id'
import { makeCoinGeckoRequest } from '../make-coingecko-request'
import type { TokenSymbol } from '@/types'

export type TokenToPrice = Partial<Record<TokenSymbol, number>>

function createURL(symbols: TokenSymbol[]) {
  const ids = symbols.map((symbol => tokenToCoinGeckoId[symbol])).join()
  return `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd`
}

export async function getPriceOfTokens(symbols: TokenSymbol[], revalidate: number): Promise<TokenToPrice> {
  const url = createURL(symbols)
  const result = await makeCoinGeckoRequest<Record<string, { usd: number }>>(url, revalidate)
  return _.chain(result)
    .mapKeys((_, key) => coinGeckoIdToToken[key])
    .mapValues(value => value.usd)
    .value()
}
