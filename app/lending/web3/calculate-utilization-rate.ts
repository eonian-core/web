import { ethers } from 'ethers'
import type { Market } from './types'

export function calculateUtilizationRate(market: Market): number {
  const denominator = market.cashInUnderlying + market.totalBorrowInUnderlying - market.totalReservesInUnderlying
  if (market.totalBorrowInUnderlying === 0n || denominator === 0n)
    return 0

  const rateMantissa = market.totalBorrowInUnderlying * 10n ** 18n / denominator
  return +ethers.formatUnits(rateMantissa, 18)
}
