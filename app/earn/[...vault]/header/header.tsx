'use client'

import React from 'react'
import styles from './header.module.scss'
import { PriceChart } from './first-line/price-chart'
import { Actions } from './second-line/actions'
import { Protected } from './second-line/protected'
import { firstLineHeaderMap } from './first-line/content'
import type { TokenSymbol } from '@/types'

interface Props {
  symbol: TokenSymbol
  currentPrice: number
}

export function Header({ symbol, currentPrice }: Props) {
  const VaultTitle = firstLineHeaderMap[symbol]

  return (
    <header className={styles.container}>
      <VaultTitle />
      <PriceChart {...{ symbol, currentPrice }} />
      <Protected />
      <Actions symbol={symbol} />
    </header>
  )
}
