import type { PriceData } from '@/types'

/**
 * A function that reduces the amount of data points to be displayed in the chart.
 * Data points should be calculated as the average of the previous and next data points.
 * @param data The price data to be reduced.
 * @param n The length of the array of reduced data.
 * @returns The reduced price data.
 */
export function reducePriceData(data: PriceData[], n = 64): PriceData[] {
  if (data.length <= n)
    return data
  const result: PriceData[] = []
  const step = data.length / n
  for (let i = 0; i < n; i++) {
    const start = Math.floor(i * step)
    const end = Math.floor((i + 1) * step)
    let sum = 0
    for (let j = start; j < end; j++) sum += data[j].price
    result.push({
      timestamp: data[end - 1].timestamp,
      price: sum / (end - start),
    })
  }
  return result
}
