import clsx from 'clsx'
import styles from './AssetRow.module.scss'
import { CircleSkeleton, OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function AssetRowSkeleton({ columns }: { columns: number }) {
  return (
    <tr className={styles.row}>
      {Array.from({ length: columns }).map((_, index) => (
        <CellSkeleton key={index} isFirst={index === 0} />
      ))}
    </tr>
  )
}

export function CellSkeleton({ isFirst }: { isFirst: boolean }) {
  return (
    <td className={styles.cell}>
      <div className={clsx(styles.cellContent, { [styles.first]: isFirst })}>
        {isFirst && <CircleSkeleton />}
        <OneLineSkeleton marginTop={isFirst ? 0 : 10} height={isFirst ? 25 : 30} />
      </div>
    </td>
  )
}
