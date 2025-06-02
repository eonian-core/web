import { Divider } from '@heroui/react'
import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { useLendingState } from '../../LendingState'
import { DonutChart } from '../charts/DonutChart'
import { DifferentiatePercentWithColor, getDifferentiateColorForTemplate } from '../misc/DifferentiatePercentWithColor'
import { Stat } from './Stat'
import styles from './MarketStats.module.scss'
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
    <div className={styles.statsContainer}>
      <Stat value={totalSupplyInUSD} big>
        Total Supply
      </Stat>
      <div className={styles.statsGroup}>
        <Stat value={totalBorrowInUSD}>Total Borrow</Stat>
        <Stat value={totalCashInUSD}>Total Collateral</Stat>
      </div>
    </div>
  )
}

function PersonalizedMarketStats() {
  const { userStatistics } = useLendingState()
  const { totalCashInUSD, totalBorrowInUSD, totalSupplyInUSD, netAPY } = userStatistics.displayValues
  const rawNetAPY = +(netAPY.slice(0, -1))

  return (
    <div className={styles.statsContainer}>
      <Stat value={totalCashInUSD} big>
        Net worth
      </Stat>
      <div className={styles.statsGroup}>
        <Stat value={totalSupplyInUSD}>Supplied</Stat>
        <Divider orientation="vertical" className={styles.divider} />
        <Stat value={totalBorrowInUSD}>Borrowed</Stat>
        <Divider orientation="vertical" className={styles.divider} />
        <Stat value={<ValueWrapper value={userStatistics.netAPY}>{netAPY}</ValueWrapper>} className={clsx({
          [styles.positiveApy]: rawNetAPY > 0,
          [styles.negativeApy]: rawNetAPY < 0,
        })}>
          Net APY
        </Stat>
        <Divider orientation="vertical" className={styles.divider} />
        <Stat
          value={ (
            <ValueWrapper value={userStatistics.borrowCapacityUsed}>
              <div className={styles.borrowCapacity}>
                <DonutChart
                  className={styles.donutChart}
                  rate={userStatistics.borrowCapacityUsed / 100}
                  color={getDifferentiateColorForTemplate(userStatistics.borrowCapacityUsed, 'borrow-capacity-used')}
                />
                <DifferentiatePercentWithColor value={userStatistics.borrowCapacityUsed} template="borrow-capacity-used" />
              </div>
            </ValueWrapper>
          )}
        >
          Borrow Capacity Used
        </Stat>
      </div>
    </div>
  )
}

function ValueWrapper({ value, children }: PropsWithChildren<{ value: number }>) {
  if (value === 0)
    return '–'

  return children
}
