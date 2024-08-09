import type { PriceData } from '@/types'

/** Calculates price change percent */
export function getPriceChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100
}

export function getPriceChangeDuringTimeline(prices: PriceData[]): number {
  const current = prices[prices.length - 1].price
  const previous = prices[0].price
  return getPriceChange(current, previous)
}
