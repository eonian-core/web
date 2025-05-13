import { Divider } from '@heroui/react'
import type { PropsWithChildren } from 'react'
import { useLendingState } from '../../LendingState'
import { DonutChart } from '../charts/DonutChart'
import { DifferentiatePercentWithColor, getDifferentiateColorForTemplate } from '../misc/DifferentiatePercentWithColor'
import { Stat } from './Stat'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'

export function MarketStats() {
  const { status } = useWalletWrapperContext()
  const isConnected = status === WalletStatus.CONNECTED

  return <div>{isConnected ? <PersonalizedMarketStats /> : <CommonMarketStats />}</div>
}

function CommonMarketStats() {
  const { commonStatistics } = useLendingState()
  const { totalCashInUSD, totalBorrowInUSD, totalSupplyInUSD } = commonStatistics.displayValues
  return (
    <div className="flex mb-4 flex-wrap gap-4 justify-between">
      <Stat label="Total Supply" value={totalSupplyInUSD} valueClasses="text-xl" center={false} />
      <div className="flex flex-wrap gap-4">
        <Stat label="Total Borrow" value={totalBorrowInUSD} />
        <Stat label="Total Value Locked" value={totalCashInUSD} />
      </div>
    </div>
  )
}

function PersonalizedMarketStats() {
  const { userStatistics } = useLendingState()
  const { totalCashInUSD, totalBorrowInUSD, totalSupplyInUSD, netAPY } = userStatistics.displayValues
  return (
    <div className="flex justify-between mb-4 flex-wrap gap-4">
      <Stat label="Net worth" value={totalCashInUSD} valueClasses="text-xl" center={false} />
      <div className="flex flex-wrap gap-4">
        <Stat label="Supplied" value={totalSupplyInUSD} />
        <Divider orientation="vertical" className="hidden mobile:block" />
        <Stat label="Borrowed" value={totalBorrowInUSD} />
        <Divider orientation="vertical" className="hidden mobile:block" />
        <Stat label="Net APY" value={<ValueWrapper value={userStatistics.netAPY}>{netAPY}</ValueWrapper>} />
        <Divider orientation="vertical" className="hidden mobile:block" />
        <Stat
          label="Borrow Capacity Used"
          value={
            <ValueWrapper
              value={userStatistics.borrowCapacityUsed}
            >
              <div className="flex items-center gap-2">
                <DonutChart
                  className="w-84 h-8"
                  rate={userStatistics.borrowCapacityUsed / 100}
                  color={getDifferentiateColorForTemplate(userStatistics.borrowCapacityUsed, 'borrow-capacity-used')}
                />
                <DifferentiatePercentWithColor value={userStatistics.borrowCapacityUsed} template="borrow-capacity-used" />
              </div>
            </ValueWrapper>
          }
        />
      </div>
    </div>
  )
}

function ValueWrapper({ value, children }: PropsWithChildren<{ value: number }>) {
  if (value === 0)
    return '–'

  return children
}
