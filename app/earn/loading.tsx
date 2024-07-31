'use client'

import pageStyles from './page.module.scss'
import gridStyles from './components/vault-grid.module.scss'
import { Header } from './components/header'
import { CardSkeleton } from '@/components/vault-card/card-loader'

export default function Loading() {
  return (
    <div className={pageStyles.page}>
    <div>
      <div className={gridStyles.header}>
        <div>
            <Header />
          </div>
        </div>
        <div className={gridStyles.cards}>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />

          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        </div>
    </div>
  )
}
