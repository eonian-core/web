import { toStringNumberFromDecimals } from '../web3'
import type { Vault } from '@/api'

export function toUSDValue(amount: bigint, decimals: number, price: bigint): bigint {
  const mantissa = 10n ** BigInt(decimals)
  return (amount * price) / mantissa
}

export function getCurrentVaultAssetPrice(vault: Vault): number {
  const { price } = vault.asset
  const { value, decimals } = price
  const bigValue = toUSDValue(1n * 10n ** BigInt(decimals), decimals, value)
  return +toStringNumberFromDecimals(bigValue, decimals)
}
