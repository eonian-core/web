import styles from './vault-grid.module.scss'
import { CardSkeleton } from '@/components/vault-card/card-skeleton'

export function VaultGridSkeleton() {
  return <div className={styles.cards}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />

        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
    </div>
}
