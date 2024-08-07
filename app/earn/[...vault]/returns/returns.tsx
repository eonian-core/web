import { useMemo, useState } from 'react'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { SectionHeader, SectionSubHeader } from '../components/section-header/section-header'
import { useVaultDepositUSD } from '../hooks/use-vault-deposit-change'
import { PercentagePriceChange } from '../components/percentage-price-change/percentage-price-change'
import { useVaultContext } from '../hooks/use-vault-context'
import styles from './returns.module.scss'
import { ReturnsChart } from './returns-chart'
import { ReturnsLegend } from './returns-legend'
import type { Vault } from '@/api'
import type { PriceData, TokenSymbol } from '@/types'
import CompactNumber from '@/components/compact-number/compact-number'
import { calculateVaultAPY } from '@/finances/apy'
import { getYearlyROI } from '@/finances/roi'
import { useTokenPrice } from '@/api/coin-gecko/useTokenPrice'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'
import { getPriceChangeDuringTimeline } from '@/finances/price'
import { convertToUsd } from '@/finances/usd'
import { ChartSkeleton } from '@/components/loader/skeleton-chart'

interface Props {
  symbol: TokenSymbol
}

type Timeframe = 'Week' | 'Month' | 'Year'

const timeLookupMap: Record<Timeframe, number> = {
  Week: 7,
  Month: 30,
  Year: 365,
}

const chartWidth = 300
const chartHeight = 160

export function Returns({ symbol }: Props) {
  const { vault } = useVaultContext()
  const [timeframe, setTimeframe] = useState<Timeframe>('Year')
  const days = timeLookupMap[timeframe]

  const { data } = useTokenPrice(symbol)
  const yearlyPriceData = data?.prices

  return (
    <div className={styles.container}>
      <SectionHeader title="Projected Returns">
        <SectionSubHeader>Based on last {timeframe.toLowerCase()} APY</SectionSubHeader>
      </SectionHeader>
      <div className={styles.chart}>
        {!yearlyPriceData
          ? <ChartSkeleton width={chartWidth} height={chartHeight}/>
          : (
          <ReturnsChart
            days={days}
            vault={vault}
            yearlyPriceData={yearlyPriceData}
            width="100%"
            height={chartHeight}
            colorGrowth="var(--color-growth)"
            colorPremium="var(--color-premium)"
          />
            )}
        {yearlyPriceData && <AmountOfReturns vault={vault} days={days} yearPriceData={yearlyPriceData} />}
      </div>
      <TimeframePicker {...{ timeframe, setTimeframe }} />
      {!yearlyPriceData
        ? (<>
        <OneLineSkeleton marginTop={5} width={chartWidth} />
        <OneLineSkeleton marginTop={5} width={chartWidth} />
      </>)
        : (
        <ReturnsLegend days={days} yearlyPriceData={yearlyPriceData} />
          )}
    </div>
  )
}

interface TimeframePickerProps {
  timeframe: Timeframe
  setTimeframe: (timeframe: Timeframe) => void
}

function TimeframePicker({ timeframe, setTimeframe }: TimeframePickerProps) {
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

interface AmountOfReturnsProps {
  vault: Vault
  days: number
  yearPriceData: PriceData[]
}

function AmountOfReturns({ vault, days, yearPriceData }: AmountOfReturnsProps) {
  const { depositInUSD, decimals } = useVaultDepositUSD(vault)

  // will display chart and growth based on hisotrical data
  const previousPrice = yearPriceData[yearPriceData.length - days]?.price
  // but current price is from Vault data, to be aligned with the form
  const currentPrice = convertToUsd(vault.asset.price)

  const apy = calculateVaultAPY(vault.rates[0].apy.yearly, vault.asset.decimals, 100)
  const growth = getPriceChangeDuringTimeline(yearPriceData)

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
