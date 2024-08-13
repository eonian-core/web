import { useEffect, useMemo, useState } from 'react'
import { Area, ComposedChart, Line, ResponsiveContainer, YAxis } from 'recharts'
import { useVaultContext } from '../hooks/use-vault-context'
import type { Vault } from '@/api'
import { reducePriceData } from '@/shared/charts/reduce-price-data'
import type { PriceData, TokenSymbol } from '@/types'
import type { YAxisDomainOptions } from '@/components/chart/axis-domain'
import { calcYAxisDomain } from '@/components/chart/axis-domain'
import { getAssetSymbol } from '@/api/vaults/get-asset-symbol'
import { getYearlyApy } from '@/finances/vault-apy'

interface Props {
  vault: Vault
  yearlyPriceData: PriceData[]
  days: number
  width: number | string
  height: number | string
  colorGrowth: string
  colorPremium: string
}

const animationDuration = 300

const coinYAxisDomain: YAxisDomainOptions = { kMin: 2, kMax: 10 }
const stableYAxisDomain: YAxisDomainOptions = { kMin: 1, kMax: 10 }

const yAxisDomainOptionsMap: { [key in TokenSymbol]: YAxisDomainOptions } = {
  ETH: coinYAxisDomain,
  BTCB: coinYAxisDomain,
  USDT: stableYAxisDomain,
  USDC: stableYAxisDomain,
  DAI: stableYAxisDomain,
  BNB: coinYAxisDomain,
}

export function ReturnsChart({ days, vault, yearlyPriceData, colorGrowth, colorPremium, width, height }: Props) {
  const data = useChartData({ days, yearlyPriceData, vault })
  const symbol = getAssetSymbol(vault)

  return (
    <ResponsiveContainer width={width} height={height}>
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="growth-bg-color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colorGrowth} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colorGrowth} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="premium-bg-color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colorPremium} stopOpacity={0.7} />
            <stop offset="95%" stopColor={colorPremium} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="returnAmountWithPremium"
          stroke="transparent"
          fillOpacity={1}
          fill="url(#premium-bg-color)"
          animationDuration={animationDuration}
        />
        <Line
          type="monotone"
          dataKey="returnAmountWithPremium"
          stroke={colorPremium}
          strokeWidth={1.5}
          strokeDasharray="5 5"
          dot={false}
          animationDuration={animationDuration}
        />
        <Area
          type="monotone"
          dataKey="returnAmount"
          stroke={colorGrowth}
          fillOpacity={1}
          fill="url(#growth-bg-color)"
          animationDuration={animationDuration}
        />

        <YAxis domain={calcYAxisDomain(yAxisDomainOptionsMap[symbol])} hide />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

interface PriceDataWithPremium extends PriceData {
  priceWithPremium: number
  returnAmount: number
  returnAmountWithPremium: number
}

const compactTo = 12

function useChartData({ days, yearlyPriceData, vault }: Pick<Props, 'days' | 'yearlyPriceData' | 'vault'>) {
  const apy = getYearlyApy(vault, 100)
  const inputValue = useDebouncedInputValue()

  return useMemo(() => {
    let data = yearlyPriceData

    /**
     * Reduce the amount of data points to be displayed (from 365 to 48), for performance reasons and smoother chart.
     */
    if (days > compactTo)
      data = reducePriceData(yearlyPriceData, compactTo)

    const result = data.slice(-days).reduce((result, data, index) => {
      result.push({
        ...data,
        priceWithPremium: data.price,
        returnAmount: inputValue * data.price,
        returnAmountWithPremium: inputValue * data.price,
      })

      if (index === 0)
        return result

      /**
       * Take minimum APY of 15% to make noticable difference on the chart
       */
      const dailyAPY = Math.max(apy * 0.01, 0.15) / compactTo
      const growth = result[index].price / result[index - 1].price

      const previous = result[index - 1]
      const priceWithPremium = previous.priceWithPremium * growth * (1 + dailyAPY)
      result[index] = {
        ...result[index],
        priceWithPremium,
        returnAmountWithPremium: priceWithPremium * inputValue,
      }

      return result
    }, [] as PriceDataWithPremium[])

    /**
     * Normalize the data to make the chart more readable.
     */
    const minPremium = result.reduce((min, data) => Math.min(min, data.priceWithPremium), Number.POSITIVE_INFINITY)
    const minDefault = result.reduce((min, data) => Math.min(min, data.price), Number.POSITIVE_INFINITY)
    return result.map(data => ({
      ...data,
      price: data.price - minDefault / 3,
      priceWithPremium: data.priceWithPremium - minPremium / 3,
    }))
  }, [days, yearlyPriceData, apy, inputValue])
}

/**
 * Ensure input is in range [0.001, 2 ** 31) to properly form a shape of the chart
 */
const cap = (value: number) => Math.max(Math.min(value, 2 ** 31 - 1), 0.001)

function useDebouncedInputValue(debounce = 100) {
  const { displayValue = '0' } = useVaultContext()

  const input = cap(+displayValue)
  const [result, setResult] = useState(input)

  useEffect(() => {
    const timeoutId = setTimeout(() => setResult(input), debounce)
    return () => clearTimeout(timeoutId)
  }, [input, debounce])

  return result
}
