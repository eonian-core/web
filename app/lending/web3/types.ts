interface CommonLendingStatisticsRaw {
  totalCashInUSD: bigint
  totalBorrowInUSD: bigint
  totalSupplyInUSD: bigint
}

interface UserLendingStatisticsRaw {
  totalCashInUSD: bigint
  totalBorrowInUSD: bigint
  totalSupplyInUSD: bigint
  netAPY: number
  ltv: number
  liquidationThreshold: number
  healthFactor: number
  borrowCapacityUsed: number
}

export interface CommonLendingStatistics extends CommonLendingStatisticsRaw {
  displayValues: Record<ExtractBigintFields<CommonLendingStatisticsRaw>, string>
}

export interface UserLendingStatistics extends UserLendingStatisticsRaw {
  displayValues: Record<ExtractBigintFields<UserLendingStatisticsRaw>, string> & {
    netAPY: string
    healthFactor: string
    ltv: string
    liquidationThreshold: string
    borrowCapacityUsed: string
  }
}

/**
 * Raw data from the blockchain
 */
export interface MarketRaw {
  address: string
  symbol: string
  name: string
  decimals: number
  collateralFactor: bigint
  borrowRatePerBlock: bigint
  supplyRatePerBlock: bigint
  totalSupply: bigint
  totalBorrowInUnderlying: bigint
  totalReservesInUnderlying: bigint
  exchangeRateStored: bigint
  cashInUnderlying: bigint
  price: bigint
  underlyingAddress: string
  underlyingSymbol: string
  underlyingName: string
  underlyingDecimals: number
}

/**
 * Raw data from the blockchain
 */
export interface UserMarketPositionRaw {
  marketAddress: string
  walletAddress: string

  walletBalanceInUnderlying: bigint
  allowanceInUnderlying: bigint
  supplyBalanceInCToken: bigint
  borrowBalanceInUnderlying: bigint

  availableForBorrowBalanceInUSD: bigint

  isEntered: boolean // Indicates if the user has entered the market (i.e. can borrow against its supply)
}

/**
 * Blockchain data that extended with local calculations
 */
export interface MarketExtended extends MarketRaw {
  borrowAPY: number
  supplyAPY: number

  totalSupplyInUnderlying: bigint
  totalSupplyInUSD: bigint
  totalBorrowInUSD: bigint
  cashInUSD: bigint
}

/**
 * Blockchain data that extended with local calculations
 */
export interface UserMarketPositionExtended extends UserMarketPositionRaw {
  walletBalanceInUSD: bigint
  supplyBalanceInUSD: bigint
  borrowBalanceInUSD: bigint

  supplyBalanceInUnderlying: bigint
  availableForBorrowBalanceInUnderlying: bigint
}

/**
 * Final model that is used across the application
 */
export interface Market extends MarketExtended {
  icon: React.ReactNode
  displayValues: Record<ExtractBigintFields<MarketExtended>, string> & {
    borrowAPY: string
    supplyAPY: string
  }

  userPosition: UserMarketPosition
}

/**
 * Final model that is used across the application
 */
export interface UserMarketPosition extends UserMarketPositionExtended {
  displayValues: Record<ExtractBigintFields<UserMarketPositionExtended>, string>
}

/**
 * Extracts all token amounts from a type T as a union
 */
export type ExtractBigintFields<T> = {
  [K in keyof T]: T[K] extends bigint
    ? K extends `${string}InUSD` | `${string}InUnderlying`
      ? K
      : never
    : never
}[keyof T]
