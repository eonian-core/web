import type { Vault } from '@/api'

export function toUSDValue(amount: bigint, decimals: number, price: bigint): bigint {
  const mantissa = 10n ** BigInt(decimals)
  return (amount * price) / mantissa
}

export function getAmountInUSD(amount: bigint, vault: Vault): [bigint, number] {
  const { decimals, price } = vault.asset
  const { value: tokenPrice, decimals: priceDecimals } = price
  const amountInUSD = toUSDValue(amount, decimals, tokenPrice)
  return [amountInUSD, priceDecimals] as const
}
