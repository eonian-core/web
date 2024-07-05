import styles from './portfolio.module.scss'
import type { Vault } from '@/api'

interface Props {
  vault: Vault
}

export function Portfolio({ vault }: Props) {
  return (
    <div id="portfolio" className={styles.container}>

    </div>
  )
}
