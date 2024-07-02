export const TokenOrder = ['BTC', 'ETH', 'USDT', 'USDC', 'DAI', 'BNB'] as const
export type TokenSymbol = (typeof TokenOrder)[number]

export interface PriceData {
  timestamp: number
  price: number
}
