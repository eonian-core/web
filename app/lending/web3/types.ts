export interface Market {
  address: string
  symbol: string
  name: string
  collateralFactor: bigint
  borrowRatePerBlock: bigint
  supplyRatePerBlock: bigint
  totalSupply: bigint
  exchangeRateStored: bigint
  price: bigint
  underlyingAddress: string
}

export interface CommonMarketData {
  markets: Market[]
  comptrollerAddress: string
  oracleAddress: string
}
