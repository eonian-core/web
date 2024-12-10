import _ from 'lodash'
import type { TokenSymbol } from '@/types'

export const tokenToCoinGeckoId: Record<TokenSymbol, string> = {
  BTCB: 'bitcoin',
  ETH: 'ethereum',
  USDT: 'tether',
  USDC: 'usd-coin',
  DAI: 'dai',
  BNB: 'binancecoin',
}

export const coinGeckoIdToToken = _.invert(tokenToCoinGeckoId) as Record<string, TokenSymbol>
