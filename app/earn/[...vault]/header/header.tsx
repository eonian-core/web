'use client'

import React from 'react'
import styles from './header.module.scss'
import { PriceChart } from './price-chart'
import { HeaderInfo } from './header-info'
import type { PriceData, TokenSymbol } from '@/types'

interface Props {
  symbol: TokenSymbol
  yearlyPriceData: PriceData[]
}

export function Header({ yearlyPriceData, symbol }: Props) {
  return (
    <header className={styles.container}>
      <HeaderInfo symbol={symbol} />
      <PriceChart symbol={symbol} yearlyPriceData={yearlyPriceData} />
    </header>
  )
}
