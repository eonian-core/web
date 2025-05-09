import { Card, CardBody, CardHeader } from '@heroui/react'
import type { Market } from '../../web3/types'
import { calculateUtilizationRate } from '../../web3/calculate-utilization-rate'
import { CardWithAPY } from './CardWithAPY'
import { UtilizationRateLine } from './UtilizationRateLine'
import { MarketInfo } from './MarketInfo'
import { CardActions } from './CardActions'

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
      <CardHeader className="z-0">
        <div className="flex flex-row gap-4 items-center justify-between">
          <div className="w-10 h-10">{market.icon}</div>
          <div className="flex flex-col gap-0.5">
            <div className="text-md text-foreground-50">{market.name}</div>
            <div className="text-sm text-foreground-500">{market.underlyingSymbol}</div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center">
          <CardWithAPY apy={market.displayValues.supplyAPY} title="Supply APY" />
          <CardWithAPY apy={market.displayValues.borrowAPY} title="Borrow APY" />
        </div>
        <UtilizationRateLine rate={calculateUtilizationRate(market)} />
        <MarketInfo market={market} />
        <CardActions onSupply={onSupply} onBorrow={onBorrow} onWithdraw={onWithdraw} onRepay={onRepay} />
      </CardBody>
    </Card>
  )
}
