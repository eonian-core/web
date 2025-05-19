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

export function LendingPage() {
  const { skeleton } = useTestSkeleton(false)

  const [loading, columns] = useColumnsWithValues()
  const { setFormData, markets, fetching } = useLendingState()
  const isMobileLayout = useIsMobileOrSmaller()

  const handleSupply = useCallback((index: number) => setFormData({ tab: FormTab.SUPPLY, market: markets[index] }), [setFormData, markets])
  const handleBorrow = useCallback((index: number) => setFormData({ tab: FormTab.BORROW, market: markets[index] }), [setFormData, markets])
  const handleWithdraw = useCallback((index: number) => setFormData({ tab: FormTab.WITHDRAW, market: markets[index] }), [setFormData, markets])
  const handleRepay = useCallback((index: number) => setFormData({ tab: FormTab.REPAY, market: markets[index] }), [setFormData, markets])

  if (loading || skeleton) {
    if (!isMobileLayout)
      return <SkeletonPage columns={columns.length} />

    return (
      <div className="grid place-items-center pt-36 bg-transparent">
        <Spinner color="primary" size="lg" />
      </div>
    )
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 bg-transparent">
      <Header />

      <div className="flex flex-col gap-3">
        <MarketStats />
        <div className="text-lg font-semibold text-foreground-50">{<TableTitle fetching={fetching} />}</div>
        {renderContent()}
      </div>

      <FormModal />
    </div>
  )

  // eslint-disable-next-line no-restricted-syntax
  function renderContent() {
    if (isMobileLayout) {
      return (
        <MobileMarketList
          onSupply={handleSupply}
          onBorrow={handleBorrow}
          onWithdraw={handleWithdraw}
          onRepay={handleRepay}
        />
      )
    }
    return (
      <AssetTable
        columns={columns}
        onSupply={handleSupply}
        onBorrow={handleBorrow}
        onWithdraw={handleWithdraw}
        onRepay={handleRepay}
      />
    )
  }
}

function TableTitle({ fetching }: { fetching: boolean }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span>Markets</span>
      {fetching && <Spinner color="primary" size="sm" />}
    </div>
  )
}

function useTestSkeleton(enabled: boolean) {
  const [skeleton, setSkeleton] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 's' && enabled)
        setSkeleton(prev => !prev)
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [enabled])

  return { skeleton, setSkeleton }
}
