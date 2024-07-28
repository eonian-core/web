import { Tag } from '../../../components/vault-card/token'
import type { Vault } from '../../../api'
import IconPalmTree from '../../../components/icons/icon-paml-tree'
import IconShieldHeart from '../../../components/icons/icon-shield-heart'
import { TokenOrder, type TokenSymbol } from '@/types'

export function getYearlyROI(apy: number, growth: number): number {
  const value = ((1 + growth / 100) * (apy / 100 + 1) - 1) * 100
  return Number(value.toFixed(2))
}

export function getGrowthPercent(vault: Vault, pastYearPriceUSD: number): number {
  const currentPrice = getPriceUSD(vault)
  return Number(((currentPrice / pastYearPriceUSD - 1) * 100).toFixed(2))
}

export function getPriceUSD(vault: Vault): number {
  const { price } = vault.asset
  const mantissa = 10n ** BigInt(price.decimals)
  const scale = 10n ** 3n
  const currentPrice = (scale * price.value) / mantissa
  return Math.ceil(Number(currentPrice) / 1000)
}

export function getAssetSymbol(vault: Vault): TokenSymbol {
  const name = vault.asset.symbol
  if (name === 'BTCB')
    return 'BTC'

  if (!TokenOrder.includes(name as TokenSymbol))
    throw new Error(`Unknown asset symbol: ${name}`)

  return name as TokenSymbol
}

export function getVaultName(symbol: TokenSymbol): string {
  const vaultName: Record<TokenSymbol, string> = {
    ETH: 'Ethereum Vault',
    BTC: 'Bitcoin Vault',
    USDT: 'Tether Vault',
    USDC: 'USD Coin Vault',
    DAI: 'DAI Vault',
    BNB: 'BNB Vault',
  }
  return vaultName[symbol]
}

export function getTags(symbol: TokenSymbol): React.ReactNode {
  switch (symbol) {
    case 'ETH':
      return (
        <>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Blue-chip</Tag>
          <Tag bordered>Save and Forget</Tag>
        </>
      )
    case 'BTC':
      return (
        <>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Blue-chip</Tag>
          <Tag bordered>Save and Forget</Tag>
        </>
      )
    case 'BNB':
      return (
        <>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Blue-chip</Tag>
          <Tag bordered>Save and Forget</Tag>
        </>
      )
    case 'USDT':
      return (
        <>
          <Tag icon={<IconPalmTree />}>Earn Passively</Tag>
          <Tag bordered>Stable</Tag>
          <Tag bordered>Zero Fee Insurance</Tag>
        </>
      )
    case 'USDC':
      return (
        <>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Stable</Tag>
          <Tag bordered>Save and Forget</Tag>
        </>
      )
    case 'DAI':
      return (
        <>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Stable</Tag>
          <Tag bordered>Save and Forget</Tag>
        </>
      )
  }
}
