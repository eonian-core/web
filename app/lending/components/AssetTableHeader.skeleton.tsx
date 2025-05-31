import clsx from 'clsx'
import styles from './AssetTableHeader.module.scss'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function AssetTableHeaderSkeleton({ columns }: { columns: number }) {
  if (columns === 0)
    return null

  return (
    <thead className={clsx(styles.tableHeader, styles.skeleton)}>
      <tr className={styles.row}>
        {Array.from({ length: columns }).map((_, index) => (
          <ThSkeleton key={index} />
        ))}
      </tr>
    </thead>
  )
}

export function ThSkeleton() {
  return (
    <th className={styles.cell}>
      <div className={styles.cellContent}>
        <OneLineSkeleton />
      </div>
    </th>
  )
}
