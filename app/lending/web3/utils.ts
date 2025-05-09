import { ethers, formatUnits } from 'ethers'
import type { MarketRaw } from './types'
import { ChainId } from '@/providers/wallet/wrappers/helpers'

const formatterNumber = Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 })
const formatterUSD = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
const formatterPercent = Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })

const tinyNumberMaxFractionDigits = 7
const formatterNumberSmall = Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: tinyNumberMaxFractionDigits })

const SECONDS_PER_YEAR = 31536000
const SECONDS_PER_BLOCK: Record<ChainId, number> = {
  [ChainId.BSC_MAINNET]: 3.0,
  [ChainId.ZEN_CHAIN_TESTNET]: 6.0,
  [ChainId.SEPOLIA]: 0,
  [ChainId.UNKNOWN]: 0,
}

export function getSecondsPerBlock(chainId: ChainId): number {
  return SECONDS_PER_BLOCK[chainId]
}

export function getBlocksPerYear(chainId: ChainId): number {
  const secondsPerBlock = getSecondsPerBlock(chainId)
  return Math.floor(SECONDS_PER_YEAR / secondsPerBlock)
}

export function calculateAPY(ratePerBlock: bigint, chainId: ChainId): number {
  const ratePerBlockAsString = ethers.formatUnits(ratePerBlock, 18)
  const ratePerBlockAsNumber = Number.parseFloat(ratePerBlockAsString)
  const blocksPerYear = getBlocksPerYear(chainId)
  const apy = ((1 + ratePerBlockAsNumber) ** blocksPerYear - 1) * 100
  if (!Number.isFinite(apy))
    return 0

  return apy
}

export function convertCTokenToUnderlying(cTokenAmount: bigint, marketData: Pick<MarketRaw, 'exchangeRateStored'>): bigint {
  return (cTokenAmount * marketData.exchangeRateStored) / 10n ** 18n
}

export function convertUnderlyingToUSD(underlyingAmount: bigint, marketData: Pick<MarketRaw, 'price'>): bigint {
  return (underlyingAmount * marketData.price) / 10n ** 18n
}

export function convertUSDToUnderlying(amountInUSD: bigint, marketData: Pick<MarketRaw, 'price'>): bigint {
  return (amountInUSD * 10n ** 18n) / marketData.price
}

export function formatAPY(apy: number): string {
  return formatPercentage(apy)
}

export function formatPercentage(value: number): string {
  return formatterPercent.format(value / 100)
}

export function formatUnderlying(amount: bigint, marketData: Pick<MarketRaw, 'underlyingDecimals'>): string {
  const amountAsNumber = +formatUnits(amount, marketData.underlyingDecimals)
  if (amountAsNumber === 0 || amountAsNumber >= 1)
    return formatterNumber.format(amountAsNumber)

  if (+amountAsNumber.toFixed(tinyNumberMaxFractionDigits) === 0)
    return `<0.${'0'.repeat(tinyNumberMaxFractionDigits - 2)}1`

  return formatterNumberSmall.format(amountAsNumber)
}

export function formatUSD(amountInUSD: bigint): string {
  const amountAsNumber = +formatUnits(amountInUSD, 18)
  return formatterUSD.format(amountAsNumber)
}

export function differenceFactorScaled(a: bigint, b: bigint, decimals: number): bigint {
  if (a === 0n || b === 0n)
    throw new Error('Cannot compute factor with zero')

  const [big, small] = a > b ? [a, b] : [b, a]
  const scale = 10n ** BigInt(decimals)
  return (big * scale) / small
}
