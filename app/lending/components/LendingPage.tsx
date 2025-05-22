import { Spinner } from '@heroui/react'
import { useCallback, useEffect, useState } from 'react'
import { useColumnsWithValues } from '../hooks/useColumnsWithValues'
import { useLendingState } from '../LendingState'
import { useIsMobileOrSmaller } from '../../components/resize-hooks/screens'
import { AssetTable } from './AssetTable'
import { MarketStats } from './market-stats/MarketStats'
import { Header } from './Header'
import { FormModal } from './form/FormModal'
import { FormTab } from './form/types'
import { MobileMarketList } from './mobile/MobileMarketList'
import SkeletonPage from './SkeletonPage'
import styles from './LendingPage.module.scss'

interface ContentProps {
  isMobileLayout?: boolean
  columns: any[]
  onSupply: (index: number) => void
  onBorrow: (index: number) => void
  onWithdraw: (index: number) => void
  onRepay: (index: number) => void
}

function Content({
  isMobileLayout,
  columns,
  onSupply,
  onBorrow,
  onWithdraw,
  onRepay,
}: ContentProps) {
  if (isMobileLayout) {
    return (
      <MobileMarketList
        onSupply={onSupply}
        onBorrow={onBorrow}
        onWithdraw={onWithdraw}
        onRepay={onRepay}
      />
    )
  }

  return (
    <AssetTable
      columns={columns}
      onSupply={onSupply}
      onBorrow={onBorrow}
      onWithdraw={onWithdraw}
      onRepay={onRepay}
    />
  )
}

export function LendingPage() {
  const [loading, columns] = useColumnsWithValues()
  const { setFormData, markets, fetching } = useLendingState()
  const isMobileLayout = useIsMobileOrSmaller()

  const handleSupply = useCallback((index: number) => setFormData({ tab: FormTab.SUPPLY, market: markets[index] }), [setFormData, markets])
  const handleBorrow = useCallback((index: number) => setFormData({ tab: FormTab.BORROW, market: markets[index] }), [setFormData, markets])
  const handleWithdraw = useCallback((index: number) => setFormData({ tab: FormTab.WITHDRAW, market: markets[index] }), [setFormData, markets])
  const handleRepay = useCallback((index: number) => setFormData({ tab: FormTab.REPAY, market: markets[index] }), [setFormData, markets])

  if (loading) {
    if (!isMobileLayout)
      return <SkeletonPage columns={columns.length} />

    return (
      <div className={styles.loadingContainer}>
        <Spinner color="primary" size="lg" />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.contentSection}>
        <MarketStats />
        {fetching
          ? <Spinner color="primary" size="sm" />
          : <Content
              isMobileLayout={isMobileLayout}
              columns={columns}
              onSupply={handleSupply}
              onBorrow={handleBorrow}
              onWithdraw={handleWithdraw}
              onRepay={handleRepay}
          />}
      </div>

      <FormModal />
    </div>
  )
}
