'use client'

import React from 'react'
import styles from './header.module.scss'
import { PriceChart } from './first-line/price-chart'
import { HeaderInfo } from './first-line/header-info'
import { Actions } from './second-line/actions'
import { SlitherProtection } from './second-line/slither-protection'
import type { PriceData, TokenSymbol } from '@/types'

interface Props {
  symbol: TokenSymbol
  yearlyPriceData: PriceData[]
}

export function Header({ yearlyPriceData, symbol }: Props) {
  return (
    <header className={styles.container}>
      <div className={styles.line}>
        <HeaderInfo symbol={symbol} />
        <PriceChart symbol={symbol} yearlyPriceData={yearlyPriceData} />
      </div>
      <div className={styles.line}>
        <Actions symbol={symbol} />
        <SlitherProtection />
      </div>
    </header>
  )
}
