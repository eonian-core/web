'use client'

import React from 'react'
import type { TokenSymbol } from '../../(landing)/views/offer/token'
import {
  Distribution,
  Tag,
  Tags,
  Token,
  TokenApy,
  TokenFees,
  TokenGrowth,
  TokenHeader,
  TokenStats,
  YearlyReturns,
} from '../../(landing)/views/offer/token'
import type { Vault } from '../../api'
import { H2, H3 } from '../../components/heading/heading'
import IconPalmTree from '../../components/icons/icon-paml-tree'
import { ChainId } from '../../providers/wallet/wrappers/helpers'
import { defaultChain } from '../../web3-onboard'

import IconShieldHeart from '../../components/icons/icon-shield-heart'
import { calculateVaultAPY } from '../../shared/projections/calculate-apy'
import { toUSDValue } from '../../shared'
import styles from './vault-grid.module.scss'
import { NetworkSelector } from './network-selector'

export type VaultsByChain = Record<ChainId, Vault[]>

interface Props {
  vaultsByChain: VaultsByChain
}

export function VaultGrid({ vaultsByChain }: Props) {
  const defaultChainId = ChainId.parse(defaultChain.id)
  const [chainId, setChainId] = React.useState(defaultChainId)
  const chainName = ChainId.getName(chainId).toLowerCase()
  const vaults = vaultsByChain[chainId]
  return (
    <div>
      <div className={styles.header}>
        <div>
          <H2>Select Cryptocurrency</H2>
          <H3>Choose an asset to save and generate passive income</H3>
        </div>
        <NetworkSelector value={chainId} onChange={setChainId} />
      </div>
      <div className={styles.cards}>
        {vaults.map((vault) => {
          return <VaultItem key={vault.address} vault={vault} />
        })}
      </div>
    </div>
  )
}

function VaultItem({ vault }: { vault: Vault }) {
  const symbol = getAssetSymbol(vault)
  const apy = calculateVaultAPY(vault, 100)
  const growth = getGrowthPercent(vault)
  return (
    <div>
      <Token token={symbol}>
        <TokenHeader>{getVaultName(symbol)}</TokenHeader>
        <Tags>{getTags(symbol)}</Tags>
        <TokenStats>
          <YearlyReturns>{getYearlyROI(apy, growth)}%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>{apy}%</TokenApy>
            <TokenGrowth>{growth}%</TokenGrowth>
          </Distribution>
        </TokenStats>
      </Token>
    </div>
  )
}

function getYearlyROI(apy: number, growth: number): number {
  const value = ((1 + (growth / 100)) * (apy / 100 + 1) - 1) * 100
  return Number(value.toFixed(2))
}

function getGrowthPercent(vault: Vault): number {
  const currentPrice = getPriceUSD(vault)
  const yearPastPrice = getYearPastPriceUSD(vault)
  return Number((((currentPrice / yearPastPrice) - 1) * 100).toFixed(2))
}

function getPriceUSD(vault: Vault): number {
  const { price } = vault.asset
  const mantissa = 10n ** BigInt(price.decimals)
  const scale = 10n ** 3n
  const currentPrice = (scale * price.value) / mantissa
  return Math.ceil(Number(currentPrice) / 1000)
}

function getYearPastPriceUSD(vault: Vault): number {
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

function getAssetSymbol(vault: Vault): TokenSymbol {
  const name = vault.asset.symbol
  if (name === 'BTCB') {
    return 'BTC'
  }
  return name as TokenSymbol
}

function getVaultName(symbol: TokenSymbol): string {
  const vaultName: Record<TokenSymbol, string> = {
    ETH: 'Ethereum Vault',
    BTC: 'Bitcoin Vault',
    USDT: 'Tether Vault',
    USDC: 'USD Coin Vault',
    DAI: 'DAI Vault',
  }
  return vaultName[symbol]
}

function getTags(symbol: TokenSymbol): React.ReactNode {
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
