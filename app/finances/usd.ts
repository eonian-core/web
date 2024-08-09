import type { Price } from '@/api/gql/graphql'

export function convertToUsd(price: Price): number {
  return bigFloatToInt(price.value, price.decimals, 1000)
}

const DEFAULT_SCALE = 10n ** 3n

/**
 * Converst solidity format float (BigInt, decimal) to integer
 * Not sure what is factor, TODO: @sergey explain
 */
export function bigFloatToInt(value: bigint, decimals: number, factor: number, scale = DEFAULT_SCALE): number {
  const mantissa = 10n ** BigInt(decimals)
  const floatValue = (scale * value) / mantissa

  return Math.ceil(Number(floatValue) / factor)
}
