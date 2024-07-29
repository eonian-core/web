import { Area, AreaChart } from 'recharts'
import { useMemo } from 'react'
import { PercentagePriceChange, getChange, getChangeColor } from '../../components/percentage-price-change'
import styles from './price-chart.module.scss'
import { reducePriceData } from '@/shared/charts/reduce-price-data'
import type { PriceData, TokenSymbol } from '@/types'
import { formatUSD } from '@/finances/humanize/format-currency'

interface ChartProps {
  symbol: TokenSymbol
  yearlyPriceData: PriceData[]
}

export function PriceChart({ symbol, yearlyPriceData }: ChartProps) {
  const currentPrice = yearlyPriceData[yearlyPriceData.length - 1].price
  const previousPrice = yearlyPriceData[0].price
  const currentPriceUSD = formatUSD(currentPrice)
  return (
    <div className={styles.container}>
      <div className={styles.priceInfo}>
        <h3>{symbol} Price</h3>
        <h2>{currentPriceUSD}</h2>
        <PercentagePriceChange currentPrice={currentPrice} previousPrice={previousPrice}>
          &nbsp;YoY
        </PercentagePriceChange>
      </div>
      <Chart yearlyPriceData={yearlyPriceData} />
    </div>
  )
}

function Chart({ yearlyPriceData }: Omit<ChartProps, 'symbol'>) {
  const change = getChange(yearlyPriceData[yearlyPriceData.length - 1].price, yearlyPriceData[0].price)
  const color = getChangeColor(change)

  // Reduce the amount of data points to be displayed (from 365 to 48), for performance reasons and smoother chart.
  const data = useMemo(() => reducePriceData(yearlyPriceData, 48), [yearlyPriceData])
  return (
    <AreaChart width={192} height={128} data={data}>
      <defs>
        <linearGradient id="chart-bg-color" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area type="monotone" dataKey="price" stroke={color} fillOpacity={1} fill="url(#chart-bg-color)" />
    </AreaChart>
  )
}
