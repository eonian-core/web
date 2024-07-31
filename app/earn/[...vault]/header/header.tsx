'use client'

import React from 'react'
import styles from './header.module.scss'
import { PriceChart } from './first-line/price-chart'
import { Actions } from './second-line/actions'
import { SlitherProtection } from './second-line/slither-protection'
import { vaultTitleMap } from './first-line/content'
import type { TokenSymbol } from '@/types'
import { useTokenPrice } from '@/api/coin-gecko/useTokenPrice'

interface Props {
  symbol: TokenSymbol
}

export function Header({ symbol }: Props) {
  const VaultTitle = vaultTitleMap[symbol]

  return (
    <header className={styles.container}>
      <VaultTitle />
      <PriceChart symbol={symbol} />
      <Actions symbol={symbol} />
      <SlitherProtection />
    </header>
  )
}
