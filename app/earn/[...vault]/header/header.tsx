'use client'

import React from 'react'
import styles from './header.module.scss'
import { PriceChart } from './first-line/price-chart'
import { Actions } from './second-line/actions'
import { SlitherProtection } from './second-line/slither-protection'
import type { PriceData, TokenSymbol } from '@/types'
import { vaultTitleMap } from './first-line/content'

interface Props {
  symbol: TokenSymbol
  yearlyPriceData: PriceData[]
}

export function Header({ yearlyPriceData, symbol }: Props) {
  const VaultTitle = vaultTitleMap[symbol]
  return (
    <header className={styles.container}>
      <VaultTitle />
      <PriceChart symbol={symbol} yearlyPriceData={yearlyPriceData} />
      <Actions symbol={symbol} />
      <SlitherProtection />
    </header>
  )
}
