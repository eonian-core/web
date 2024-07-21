import { useMemo, useState } from 'react'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { SectionHeader, SectionSubHeader } from '../components/section-header'
import { useVaultDepositUSD } from '../hooks/use-vault-deposit-change'
import { PercentagePriceChange } from '../components/percentage-price-change'
import { useVaultContext } from '../hooks/use-vault-context'
import styles from './returns.module.scss'
import { ReturnsChart } from './returns-chart'
import { ReturnsLegend } from './returns-legend'
import type { Vault } from '@/api'
import type { PriceData } from '@/types'
import { getGrowthPercent, getYearlyROI } from '@/earn/components/vault-card/vault-card-features'
import { calculateVaultAPY } from '@/shared/projections/calculate-apy'
import CompactNumber from '@/components/compact-number/compact-number'

interface Props {
  yearlyPriceData: PriceData[]
}

type Timeframe = 'Week' | 'Month' | 'Year'

const timeLookupMap: Record<Timeframe, number> = {
  Week: 7,
  Month: 30,
  Year: 365,
}

export function Returns({ yearlyPriceData }: Props) {
  const { vault } = useVaultContext()
  const [timeframe, setTimeframe] = useState<Timeframe>('Year')
  const days = timeLookupMap[timeframe]
  return (
    <div className={styles.container}>
      <SectionHeader title="Projected Returns">
        <SectionSubHeader>Based on last {timeframe.toLowerCase()} APY</SectionSubHeader>
      </SectionHeader>
      <div className={styles.chart}>
        <ReturnsChart
          days={days}
          vault={vault}
          yearlyPriceData={yearlyPriceData}
          width="100%"
          height={160}
          colorGrowth="var(--color-growth)"
          colorPremium="var(--color-premium)"
        />
        <AmountOfReturns vault={vault} days={days} yearPriceData={yearlyPriceData} />
      </div>
      <TimeframePicker />
      <ReturnsLegend days={days} yearlyPriceData={yearlyPriceData} />
    </div>
  )

  function TimeframePicker() {
    return (
      <div className={styles.timeframe}>
        {Object.keys(timeLookupMap).map(key => (
          <Button
            key={key}
            variant={timeframe === key ? 'flat' : 'light'}
            className={clsx(styles.button, { [styles.active]: timeframe === key })}
            size="sm"
            onClick={() => setTimeframe(key as Timeframe)}
          >
            {key}
          </Button>
        ))}
      </div>
    )
  }
}

interface AmountOfReturnsProps {
  vault: Vault
  days: number
  yearPriceData: PriceData[]
}

function AmountOfReturns({ vault, days, yearPriceData }: AmountOfReturnsProps) {
  const { depositInUSD, decimals } = useVaultDepositUSD(vault)

  const currentPrice = yearPriceData[yearPriceData.length - 1]?.price
  const previousPrice = yearPriceData[yearPriceData.length - days]?.price

  const apy = calculateVaultAPY(vault, 100)
  const growth = getGrowthPercent(vault, previousPrice)

  const depositWithROI = useMemo(() => {
    const yearlyROI = getYearlyROI(apy, growth)
    const forPeriod = (yearlyROI / timeLookupMap.Year) * days
    const rounded = Math.round(forPeriod * 100)

    const nominator = 10n ** BigInt(decimals)
    const denominator = 10n ** BigInt(decimals + 4)
    const scaled = BigInt(rounded) * nominator

    return depositInUSD + (depositInUSD * scaled) / denominator
  }, [apy, growth, decimals, depositInUSD, days])

  const changeAPY = (apy / 365 * days) / 100 + 1

  return (
    <div className={styles.returns}>
      <div className={styles.amount}>
        <CompactNumber value={depositWithROI} decimals={decimals} fractionDigits={2} childrenAtStart hideTooltip>
          <>$</>
        </CompactNumber>
      </div>
      <PercentagePriceChange className={styles.percent} currentPrice={currentPrice * changeAPY} previousPrice={previousPrice} />
    </div>
  )
}
