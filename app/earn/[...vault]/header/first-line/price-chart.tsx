import { Area, AreaChart, YAxis } from 'recharts'
import { useMemo } from 'react'
import type { IContentLoaderProps } from 'react-content-loader'
import ContentLoader from 'react-content-loader'
import type { AxisDomain } from 'recharts/types/util/types'
import { PercentagePriceChange, getChangeColor } from '../../components/percentage-price-change'
import { useVaultContext } from '../../hooks/use-vault-context'
import styles from './price-chart.module.scss'
import { reducePriceData } from '@/shared/charts/reduce-price-data'
import type { PriceData, TokenSymbol } from '@/types'
import { formatUSD } from '@/finances/humanize/format-currency'
import { useTokenPrice } from '@/api/coin-gecko/useTokenPrice'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'
import { getPriceChange, getPriceChangeDuringTimeline } from '@/finances/price'
import { calcYAxisDomain } from '@/components/chart/axis-domain'
import { getAssetSymbol } from '@/api/vaults/get-asset-symbol'

interface ChartProps {
  symbol: TokenSymbol
}

export function PriceChart({ symbol }: ChartProps) {
  const { data } = useTokenPrice(symbol)
  const yearlyPriceData = data?.prices

  if (!yearlyPriceData) {
    return (
      <div className={styles.container}>
        <div className={styles.priceInfo}>
          <h3>{symbol} Price</h3>
          <h2><OneLineSkeleton width={80} /></h2>
          <OneLineSkeleton marginTop={0} height={20} width={80} />
        </div>
        <ChartSkeleton />
      </div>
    )
  }

  const currentPrice = yearlyPriceData[yearlyPriceData.length - 1].price
  const previousPrice = yearlyPriceData[0].price
  const currentPriceUSD = formatUSD(currentPrice)
  return (
    <div className={styles.container}>
      <Chart yearlyPriceData={yearlyPriceData} />
      <div className={styles.priceInfo}>
        <h3>{symbol} Price</h3>
        <div className={styles.price}>
          <h2>{currentPriceUSD}</h2>
          <PercentagePriceChange currentPrice={currentPrice} previousPrice={previousPrice}>
            &nbsp;YoY
          </PercentagePriceChange>
        </div>
      </div>
    </div>
  )
}

const chartWidth = 315
const chartHeight = 128

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

function Chart({ yearlyPriceData }: { yearlyPriceData: PriceData[] }) {
  const change = getPriceChangeDuringTimeline(yearlyPriceData)
  const color = getChangeColor(change)
  const { vault } = useVaultContext()
  const symbol = getAssetSymbol(vault)

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

function ChartSkeleton(props: IContentLoaderProps) {
  return (
    <ContentLoader
      width={chartWidth}
      height={chartHeight}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      backgroundColor="#b6b6b658"
      foregroundColor="#c9c7c7c0"
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width={chartWidth} height={chartHeight} />
    </ContentLoader>
  )
}
