import type { CommonLendingStatistics, Market, UserLendingStatistics } from './types'
import { convertUnderlyingToUSD, formatAPY, formatPercentage, formatUSD } from './utils'

export function calculateCommonStatistics(markets: Market[]): CommonLendingStatistics {
  const calculatedValues = markets.reduce((acc, market) => {
    return {
      totalCashInUSD: acc.totalCashInUSD + market.cashInUSD,
      totalBorrowInUSD: acc.totalBorrowInUSD + market.totalBorrowInUSD,
      totalSupplyInUSD: acc.totalSupplyInUSD + market.totalSupplyInUSD,
    }
  },
  {
    totalCashInUSD: 0n,
    totalBorrowInUSD: 0n,
    totalSupplyInUSD: 0n,
  } as Omit<CommonLendingStatistics, 'displayValues'>,
  )

  return {
    ...calculatedValues,
    displayValues: {
      totalCashInUSD: formatUSD(calculatedValues.totalCashInUSD),
      totalBorrowInUSD: formatUSD(calculatedValues.totalBorrowInUSD),
      totalSupplyInUSD: formatUSD(calculatedValues.totalSupplyInUSD),
    },
  }
}

export function calculateUserStatistics(markets: Market[]): UserLendingStatistics {
  const calculatedValues = markets.reduce((acc, market) => {
    const totalBorrowInUSD = acc.totalBorrowInUSD + market.userPosition.borrowBalanceInUSD
    const totalSupplyInUSD = acc.totalSupplyInUSD + market.userPosition.supplyBalanceInUSD
    return {
      totalCashInUSD: totalSupplyInUSD - totalBorrowInUSD,
      totalBorrowInUSD,
      totalSupplyInUSD,
    }
  },
  {
    totalCashInUSD: 0n,
    totalBorrowInUSD: 0n,
    totalSupplyInUSD: 0n,
  } as Omit<UserLendingStatistics, 'displayValues' | 'ltv' | 'liquidationThreshold' | 'healthFactor' | 'netAPY' | 'borrowCapacityUsed'>,
  )

  const netAPY = calculateNetAPY(markets)
  const ltv = calculateLTV(calculatedValues.totalSupplyInUSD, calculatedValues.totalBorrowInUSD)
  const liquidationThreshold = calculateLiquidationThreshold(markets)
  const healthFactor = ltv > 0 ? liquidationThreshold / ltv : -1
  const borrowCapacityUsed = calculateBorrowCapacityUsed(markets)
  return {
    ...calculatedValues,
    ltv,
    liquidationThreshold,
    healthFactor,
    borrowCapacityUsed,
    netAPY,
    displayValues: {
      totalCashInUSD: formatUSD(calculatedValues.totalCashInUSD),
      totalBorrowInUSD: formatUSD(calculatedValues.totalBorrowInUSD),
      totalSupplyInUSD: formatUSD(calculatedValues.totalSupplyInUSD),
      netAPY: formatAPY(netAPY),
      healthFactor: healthFactor.toFixed(2),
      ltv: formatPercentage(ltv),
      liquidationThreshold: formatPercentage(liquidationThreshold),
      borrowCapacityUsed: formatPercentage(borrowCapacityUsed),
    },
  }
}

export function calculateNetAPY(markets: Market[]): number {
  let totalSupplyInUSD = 0n
  const totalSupplyInterest = markets.reduce((acc, market) => {
    const supplyUSD = convertUnderlyingToUSD(market.userPosition.supplyBalanceInUnderlying, market)
    totalSupplyInUSD += supplyUSD
    return acc + (Number(supplyUSD) * market.supplyAPY / 100)
  }, 0)
  const totalBorrowInterest = markets.reduce((acc, market) => {
    const borrowUSD = convertUnderlyingToUSD(market.userPosition.borrowBalanceInUnderlying, market)
    return acc + (Number(borrowUSD) * market.borrowAPY / 100)
  }, 0)
  if (totalSupplyInUSD === 0n)
    return 0

  return (totalSupplyInterest - totalBorrowInterest) / Number(totalSupplyInUSD) * 100
}

export function calculateBorrowCapacityUsed(markets: Market[]): number {
  const totals = markets.reduce((acc, market) => {
    const totalBorrowInUSD = acc.totalBorrowInUSD + market.userPosition.borrowBalanceInUSD
    const totalSupplyInUSD = acc.totalSupplyInUSD + market.userPosition.supplyBalanceInUSD
    return { totalBorrowInUSD, totalSupplyInUSD }
  }, { totalBorrowInUSD: 0n, totalSupplyInUSD: 0n })
  const ltv = calculateLTV(totals.totalSupplyInUSD, totals.totalBorrowInUSD)
  const liquidationThreshold = calculateLiquidationThreshold(markets)
  return liquidationThreshold === 0 ? 0 : ltv * (100 / liquidationThreshold)
}

function calculateLTV(totalSupplyInUSD: bigint, totalBorrowInUSD: bigint): number {
  if (totalSupplyInUSD === 0n)
    return 0

  return Number(totalBorrowInUSD * 1000000n / totalSupplyInUSD) / 10000
}

function calculateLiquidationThreshold(markets: Market[]): number {
  const enteredMarkets = markets.filter(market => market.userPosition.isEntered)

  let total = 0n
  let weighted = 0n

  for (const market of enteredMarkets) {
    const supplyUSD = convertUnderlyingToUSD(market.userPosition.supplyBalanceInUnderlying, market)
    total += supplyUSD
    weighted += supplyUSD * market.collateralFactor
  }

  if (total === 0n)
    return 0

  const weightedAverageCF = weighted / total
  const liquidationThreshold = weightedAverageCF * 100n / (10n ** 18n)
  return Number(liquidationThreshold)
}
