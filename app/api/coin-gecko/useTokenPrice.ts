import { usePromise } from '../use-promise'
import type { PriceData, TokenSymbol } from '@/types'
import { isOnServer } from '@/components/resize-hooks/isOnServer'
import { VERCEL_ENV } from '@/utils/env'

const ONE_HOUR = 3600 // in seconds

export interface CoinGeckoGetResponse {
  prices: PriceData[]
}
// fallback for server components
function getPrefix() {
  if (!isOnServer())
    return '' // will use relative path on client

  if (!VERCEL_ENV)
    return 'http://localhost:3000' // local

  if (VERCEL_ENV === 'production')
    return 'https://eonian.finance' // production

  return process.env.VERCEL_URL ?? '' // preview
}

export type PastYearPrices = Record<TokenSymbol, CoinGeckoGetResponse>

export interface TokenPriceResponse extends CoinGeckoGetResponse {
  pastYearPrice: number
}

async function getTokenPrice(symbol: TokenSymbol): Promise<TokenPriceResponse> {
  const response: Response = await fetch(`${getPrefix()}/api/coin-gecko?symbol=${symbol}`, {
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

export function useTokenPrice(symbol: TokenSymbol) {
  // TODO: switch in future from usePromise to tanstack query, it have much better caching,
  //  but it harder to setup properly with latest version of NextJS
  return usePromise(async () => await getTokenPrice(symbol), [symbol])
}
