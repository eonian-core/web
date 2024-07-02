import { Area, AreaChart } from 'recharts'
import { useMemo } from 'react'
import { Tooltip } from '@nextui-org/react'
import styles from './price-chart.module.scss'
import { reducePriceData } from '@/shared/charts/reduce-price-data'
import type { PriceData, TokenSymbol } from '@/types'

interface ChartProps {
  symbol: TokenSymbol
  yearlyPriceData: PriceData[]
}

export function PriceChart({ symbol, yearlyPriceData }: ChartProps) {
  const currentPrice = formatUSD(yearlyPriceData[yearlyPriceData.length - 1].price)
  return (
    <div className={styles.container}>
      <div className={styles.priceInfo}>
        <h3>{symbol} Price</h3>
        <h2>{currentPrice}</h2>
        <PriceChange yearlyPriceData={yearlyPriceData} />
      </div>
      <Chart yearlyPriceData={yearlyPriceData} />
    </div>
  )
}

function PriceChange({ yearlyPriceData }: Omit<ChartProps, 'symbol'>) {
  const change = getChange(yearlyPriceData)
  const prefix = change > 0 ? '+' : '-'
  return (
    <Tooltip content={<TooltipContent />}>
      <div className={styles.priceChange} style={{ color: getChangeColor(yearlyPriceData) }}>
        {prefix}
        {Math.abs(change).toFixed(2)}% YoY
      </div>
    </Tooltip>
  )

  function TooltipContent() {
    return <>Change (last year): <b>{prefix}{formatUSD(getChangeDelta(yearlyPriceData))}</b></>
  }
}

function Chart({ yearlyPriceData }: Omit<ChartProps, 'symbol'>) {
  const color = getChangeColor(yearlyPriceData)
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

function getChange(yearlyPriceData: PriceData[]): number {
  return (getChangeDelta(yearlyPriceData) / yearlyPriceData[0].price) * 100
}

function getChangeDelta(yearlyPriceData: PriceData[]): number {
  const firstPrice = yearlyPriceData[0].price
  const lastPrice = yearlyPriceData[yearlyPriceData.length - 1].price
  return lastPrice - firstPrice
}

function getChangeColor(yearlyPriceData: PriceData[]): string {
  return `var(${getChange(yearlyPriceData) > 0 ? '--color-positive' : '--color-negative'})`
}

function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
