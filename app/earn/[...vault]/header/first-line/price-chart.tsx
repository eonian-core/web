import { Area, AreaChart, YAxis } from 'recharts'
import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import type { AxisDomain } from 'recharts/types/util/types'
import {
  PercentagePriceChange,
  getChangeColor,
} from '../../components/percentage-price-change/percentage-price-change'
import { Actions } from '../second-line/actions'
import styles from './price-chart.module.scss'
import { chartHeight, chartWidth } from './price-chart-skeleton'
import { reducePriceData } from '@/shared/charts/reduce-price-data'
import type { PriceData, TokenSymbol } from '@/types'
import { formatUSD } from '@/finances/humanize/format-currency'
import { useTokenPrice } from '@/api/coin-gecko/useTokenPrice'
import { getPriceChangeDuringTimeline } from '@/finances/price'
import { ChartSkeleton } from '@/components/loader/skeleton-chart'

interface ChartProps {
  symbol: TokenSymbol
  currentPrice: number
}

export function PriceChart({ symbol, currentPrice }: ChartProps) {
  const { data } = useTokenPrice(symbol)
  const yearlyPriceData = data?.prices

  if (!yearlyPriceData) {
    return (
      <div className={styles.container}>
        <PriceInfo {...{ symbol, currentPrice }}></PriceInfo>
        <ChartSkeleton width={chartWidth} height={chartHeight} />
      </div>
    )
  }

  const previousPrice = yearlyPriceData[0].price

  return (
    <div className={styles.container}>
      <Chart yearlyPriceData={yearlyPriceData} symbol={symbol} />
      <PriceInfo {...{ symbol, currentPrice }}>
        <PercentagePriceChange currentPrice={currentPrice} previousPrice={previousPrice}>
          &nbsp;YoY
        </PercentagePriceChange>
      </PriceInfo>
    </div>
  )
}

function PriceInfo({ symbol, currentPrice, children }: PropsWithChildren<ChartProps>) {
  const currentPriceUSD = formatUSD(currentPrice)

  return (
    <div className={styles.priceInfo}>
      <h3>
        {symbol} Price
        <Actions className={styles.moreInfo} symbol={symbol} />
      </h3>
      <div className={styles.price}>
        <h2>{currentPriceUSD}</h2>
        {children}
      </div>
    </div>
  )
}

const coinYAxisDomain: AxisDomain = ['auto', 'auto']
const stableYAxisDomain: AxisDomain = [0, 2]

const yAxisDomainMap: { [key in TokenSymbol]: AxisDomain } = {
  ETH: coinYAxisDomain,
  BTCB: coinYAxisDomain,
  USDT: stableYAxisDomain,
  USDC: stableYAxisDomain,
  DAI: stableYAxisDomain,
  BNB: coinYAxisDomain,
}

function Chart({ yearlyPriceData, symbol }: { yearlyPriceData: PriceData[]; symbol: TokenSymbol }) {
  const change = getPriceChangeDuringTimeline(yearlyPriceData)
  const color = getChangeColor(change)

  // Reduce the amount of data points to be displayed (from 365 to 48), for performance reasons and smoother chart.
  const data = useMemo(() => reducePriceData(yearlyPriceData, 48), [yearlyPriceData])
  return (
    <AreaChart width={chartWidth} height={chartHeight} data={data}>
      <defs>
        <linearGradient id="chart-bg-color" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area type="monotone" dataKey="price" stroke={color} fillOpacity={1} fill="url(#chart-bg-color)" />

      <YAxis domain={yAxisDomainMap[symbol]} hide />
    </AreaChart>
  )
}
