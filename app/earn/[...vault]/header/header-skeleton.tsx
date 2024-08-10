import React from 'react'
import styles from './header.module.scss'
import { VaultTitleSkeleton } from './first-line/vault-title-skeleton'
import { PriceChartSkeleton } from './first-line/price-chart-skeleton'
import { ActionsSkeleton } from './second-line/actions-skeleton'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function HeaderSkeleton() {
  return (
    <header className={styles.container}>
        <VaultTitleSkeleton />
        <PriceChartSkeleton />
        <OneLineSkeleton width={200} height={32}/>
        <ActionsSkeleton />
    </header>
  )
}
