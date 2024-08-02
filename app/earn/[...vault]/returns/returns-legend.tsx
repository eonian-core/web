import { useVaultContext } from '../hooks/use-vault-context'
import styles from './returns-legend.module.scss'
import { getGrowthPercent } from '@/finances/growth'
import type { PriceData } from '@/types'
import { calculateVaultAPY } from '@/finances/apy'

interface Props {
  days: number
  yearlyPriceData: PriceData[]
}

export function ReturnsLegend({ days, yearlyPriceData }: Props) {
  const { vault } = useVaultContext()
  const apy = calculateVaultAPY(vault.rates[0].apy.yearly, vault.asset.decimals, 100) / 365 * days
  const growth = getGrowthPercent(vault.asset.price, yearlyPriceData[0].price) / 365 * days
  return (
    <ul className={styles.container}>
      <li className={styles.growth}>
        <span>Coin Growth</span>
        <span className={styles.value}>{growth.toFixed(2)}</span>
      </li>
      <li className={styles.premium}>
        <span>Savings Premium</span>
        <span className={styles.value}>{apy.toFixed(2)}</span>
      </li>
    </ul>
  )
}
