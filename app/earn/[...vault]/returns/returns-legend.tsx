import { useVaultContext } from '../hooks/use-vault-context'
import styles from './returns-legend.module.scss'
import type { PriceData } from '@/types'
import { formatPercent } from '@/finances/humanize/format-persent'
import { getPriceChangeDuringTimeline } from '@/finances/price'
import { getYearlyApy } from '@/finances/vault-apy'

interface Props {
  days: number
  yearlyPriceData: PriceData[]
}

export function ReturnsLegend({ days, yearlyPriceData }: Props) {
  const { vault } = useVaultContext()
  const apy = getYearlyApy(vault, 100) / 365 * days
  const growth = getPriceChangeDuringTimeline(yearlyPriceData) / 365 * days
  return (
    <ul className={styles.container}>
      <li className={styles.growth}>
        <span>Coin Growth</span>
        <span className={styles.value}>{formatPercent(growth).percent}</span>
      </li>
      <li className={styles.premium}>
        <span>Savings Premium</span>
        <span className={styles.value}>{formatPercent(apy).percent}</span>
      </li>
    </ul>
  )
}
