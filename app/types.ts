export const TokenOrder = ['ETH', 'BTCB', 'USDT', 'USDC', 'DAI', 'BNB'] as const
export type TokenSymbol = (typeof TokenOrder)[number]

export interface PriceData {
  timestamp: number
  price: number
}

export interface RewardApy {
  daily: bigint
  decimals: number
  monthly: bigint
  weekly: bigint
  yearly: bigint
}

export interface InterestRate {
  apy: RewardApy
  duration?: number
  perBlock: bigint
}

export interface Price {
  decimals: number
  value: bigint
}

export interface Token {
  address: string
  decimals: number
  name: string
  price: Price
  symbol: string
}

export interface Vault {
  address: string
  asset: Token
  debtRatio: bigint
  decimals: number
  fundAssets: bigint
  lastReportTimestamp: bigint
  maxBps: bigint
  name: string
  rates: Array<InterestRate>
  symbol: string
  totalAssets: bigint
  totalDebt: bigint
  totalSupply: bigint
  version: string
}
