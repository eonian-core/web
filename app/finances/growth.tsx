import { convertToUsd } from './usd'
import type { Price } from '@/types'

export function getGrowthPercent(price: Price, pastYearPriceUSD: number): number {
  const currentPrice = convertToUsd(price)

  return Number(((currentPrice / pastYearPriceUSD - 1) * 100).toFixed(2))
}
