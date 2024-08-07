export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: maxFractionDigits(value),
  }).format(value)
}

export function maxFractionDigits(value: number): number {
  if (value === 0)
    return 0 // 0 => $0

  if (value < 1)
    return 3 // 0.312312 => $0.312

  if (value < 100)
    return 2 // 31.2312 => $31.23

  if (value < 1000)
    return 1 // 312.312 => $312.3

  return 0 // 1321.232 => $1,321
}
