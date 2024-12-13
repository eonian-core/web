import type { TokenToPrice } from './get-current-price'
import { PRICE_CACHE_TIMEOUT_SECONDS } from './constants'
import type { TokenSymbol } from '@/types'
import { usePromise } from '@/api/use-promise'
import { getVercelHostPrefix } from '@/api/endpoints'

export async function getCurrentPriceOfTokens(symbols: TokenSymbol[]): Promise<TokenToPrice> {
  const response: Response = await fetch(`${getVercelHostPrefix()}/api/coin-gecko/price?symbols=${symbols.join()}`, {
    next: {
      revalidate: PRICE_CACHE_TIMEOUT_SECONDS,
    },
  })
  return await response.json() as TokenToPrice
}

export function useCurrentPriceOfTokens(symbols: TokenSymbol[]) {
  return usePromise(async () => await getCurrentPriceOfTokens(symbols), [symbols])
}
