export function getYearlyROI(apy: number, growth: number): number {
  const value = ((1 + growth / 100) * (apy / 100 + 1) - 1) * 100
  return Number(value.toFixed(2))
}
