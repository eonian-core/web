import { Card, CardBody, CardHeader } from '@heroui/react'
import type { Market } from '../../web3/types'
import { calculateUtilizationRate } from '../../web3/calculate-utilization-rate'
import { ApyStat } from './ApyStat'
import { UtilizationRateLine } from './UtilizationRateLine'
import { MarketInfo } from './MarketInfo'
import { CardActions } from './CardActions'
import styles from './MobileMarketCard.module.scss'
import { HumanReadableTokenName } from '@/lending/hooks/HumanReadableTokenName'

interface Props {
  market: Market

  onWithdraw: () => void
  onRepay: () => void
  onBorrow: () => void
  onSupply: () => void
}

export function MobileMarketCard({ market, onWithdraw, onRepay, onBorrow, onSupply }: Props) {
  return (
    <Card>
      <CardHeader className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconContainer}>{market.icon}</div>
          <div className={styles.textContainer}>
            <div className={styles.marketName}>{HumanReadableTokenName[market.underlyingSymbol] || market.name}</div>
            <div className={styles.underlyingSymbol}>{market.underlyingSymbol}</div>
          </div>
        </div>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <div className={styles.apyContainer}>
          <ApyStat apy={market.displayValues.supplyAPY}>Supply APY</ApyStat>
          <div className={styles.divider}>{' '}</div>
          <ApyStat apy={market.displayValues.borrowAPY}>Borrow APY</ApyStat>
        </div>
        <UtilizationRateLine rate={calculateUtilizationRate(market)} />
        <MarketInfo market={market} />
        <CardActions onSupply={onSupply} onBorrow={onBorrow} onWithdraw={onWithdraw} onRepay={onRepay} />
      </CardBody>
    </Card>
  )
}
