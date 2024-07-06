import styles from './portfolio.module.scss'
import { PortfolioChart } from './portfolio-chart'
import type { Vault } from '@/api'

interface Props {
  vault: Vault
}

export function Portfolio({ vault }: Props) {
  return (
    <div id="portfolio" className={styles.container}>
      <PortfolioChart vault={vault} size={160} />
      <ul className={styles.legend}>
        <li className={styles.wallet}>
          <span className={styles.label}>Wallet</span>
          <span className={styles.value}>0</span>
        </li>
        <li className={styles.vault}>
          <span className={styles.label}>Vault</span>
          <span className={styles.value}>0</span>
        </li>
        <li className={styles.coverage}>
          <span className={styles.label}>Insurance Coverage</span>
          <span className={styles.value}>0</span>
        </li>
      </ul>
    </div>
  )
}
