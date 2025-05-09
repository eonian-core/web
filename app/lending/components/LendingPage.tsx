import { Skeleton, Spinner } from '@heroui/react'
import { useCallback, useEffect, useState } from 'react'
import { useColumnsWithValues } from '../hooks/useColumnsWithValues'
import { useLendingState } from '../LendingState'
import { useScreenWidth } from '../hooks/useScreenWidth'
import { AssetTable } from './AssetTable'
import { MarketStats } from './market-stats/MarketStats'
import { Header } from './Header'
import { FormModal } from './form/FormModal'
import { FormTab } from './form/types'
import { MobileMarketList } from './mobile/MobileMarketList'

export function LendingPage() {
  const { skeleton } = useTestSkeleton(false)

  const [loading, columns] = useColumnsWithValues()
  const { setFormData, markets, fetching } = useLendingState()
  const { screenLTE } = useScreenWidth()
  const isMobileLayout = screenLTE('mobile')

  const handleSupply = useCallback((index: number) => setFormData({ tab: FormTab.SUPPLY, market: markets[index] }), [setFormData, markets])
  const handleBorrow = useCallback((index: number) => setFormData({ tab: FormTab.BORROW, market: markets[index] }), [setFormData, markets])
  const handleWithdraw = useCallback((index: number) => setFormData({ tab: FormTab.WITHDRAW, market: markets[index] }), [setFormData, markets])
  const handleRepay = useCallback((index: number) => setFormData({ tab: FormTab.REPAY, market: markets[index] }), [setFormData, markets])

  if (loading || skeleton) {
    if (!isMobileLayout) {
      return (
        <div className="py-8 max-w-7xl mx-auto px-4 bg-transparent">
          {/* Header skeleton */}
          <div className="flex flex-col mb-8">
            <Skeleton classNames={{ base: 'h-10 w-2/5 mb-2' }} />
            <Skeleton classNames={{ base: 'h-5 w-1/3' }} />
          </div>

          {/* MarketStats skeleton */}
          <div className="flex justify-between mb-6">
            <div className="flex flex-col gap-1 w-36">
              <Skeleton classNames={{ base: 'h-5 w-3/4' }} />
              <Skeleton classNames={{ base: 'h-8 w-2/3' }} />
            </div>
            <div className="flex mb-6 flex-1 justify-end">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1 w-36">
                  <Skeleton classNames={{ base: 'h-5 w-3/4' }} />
                  <Skeleton classNames={{ base: 'h-8 w-2/3' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Table title skeleton */}
          <Skeleton classNames={{ base: 'h-7 w-24 mb-4' }} />

          {/* Table header skeleton */}
          <div className="flex mb-3 gap-2">
            {columns.map((_, i) => (
              <Skeleton key={i} classNames={{ base: 'h-5 flex-1' }} />
            ))}
            <Skeleton classNames={{ base: 'h-5 w-24' }} />
          </div>

          {/* Table rows skeleton */}
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} classNames={{ base: 'h-14 w-full mb-1' }} />
          ))}
        </div>
      )
    }
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
