import type { TokenSymbol } from '../../../(landing)/views/offer/token'
import { Tag } from '../../../(landing)/views/offer/token'
import type { Vault } from '../../../api'
import IconPalmTree from '../../../components/icons/icon-paml-tree'
import IconShieldHeart from '../../../components/icons/icon-shield-heart'

export function getYearlyROI(apy: number, growth: number): number {
  const value = ((1 + growth / 100) * (apy / 100 + 1) - 1) * 100
  return Number(value.toFixed(2))
}

export function getGrowthPercent(vault: Vault): number {
  const currentPrice = getPriceUSD(vault)
  const yearPastPrice = getYearPastPriceUSD(vault)
  return Number(((currentPrice / yearPastPrice - 1) * 100).toFixed(2))
}

export function getPriceUSD(vault: Vault): number {
  const { price } = vault.asset
  const mantissa = 10n ** BigInt(price.decimals)
  const scale = 10n ** 3n
  const currentPrice = (scale * price.value) / mantissa
  return Math.ceil(Number(currentPrice) / 1000)
}

export function getYearPastPriceUSD(vault: Vault): number {
  const symbol = getAssetSymbol(vault)
  /**
   * TODO: Use up-to-date values instead of this hardcoded data (from ~Nov. 2023)
   */
  const price: Record<TokenSymbol, number> = {
    ETH: 2121,
    BTC: 34500,
    USDT: 1,
    USDC: 1,
    DAI: 1,
  }
  return price[symbol]
}

export function getAssetSymbol(vault: Vault): TokenSymbol {
  const name = vault.asset.symbol
  if (name === 'BTCB') {
    return 'BTC'
  }
  return name as TokenSymbol
}

export function getVaultName(symbol: TokenSymbol): string {
  const vaultName: Record<TokenSymbol, string> = {
    ETH: 'Ethereum Vault',
    BTC: 'Bitcoin Vault',
    USDT: 'Tether Vault',
    USDC: 'USD Coin Vault',
    DAI: 'DAI Vault',
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
