import styles from './AssetRow.module.scss'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function AssetRowSkeleton({ columns }: { columns: number }) {
  return (
    <tr className={styles.row}>
      {Array.from({ length: columns }).map((_, index) => (
        <CellSkeleton key={index} />
      ))}
    </tr>
  )
}

export function CellSkeleton() {
  return (
    <td className={styles.cell}>
      <div className={styles.cellContent}>
        <OneLineSkeleton />
      </div>
    </td>
  )
}
