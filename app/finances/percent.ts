import { useMemo } from 'react'

const PERCENT_BASE = 10000
const PERCENT_BASEn = BigInt(PERCENT_BASE)

export function useDivToPercent(value: bigint, balance: bigint) {
  return useMemo(() =>
    (value * PERCENT_BASEn) / balance,
  [value, balance])
}

export function usePercentToBigInt(value: number) {
  return useMemo(() =>
    BigInt(value * PERCENT_BASE), [value],
  )
}

export function useMultiplyOnPercent(value: bigint, percent: number) {
  const percentN = usePercentToBigInt(percent)
  return useMemo(() =>
    value * percentN / PERCENT_BASEn,
  [value, percentN],
  )
}
