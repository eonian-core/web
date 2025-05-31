import clsx from 'clsx'
import type { ColumnKey } from '../hooks/useColumns'
import { ActionButtons } from './ActionButtons'
import styles from './AssetRow.module.scss'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

export interface RowColumnData {
  key: ColumnKey
  label: string
  value: React.ReactNode
}

interface AssetRowProps {
  onWithdraw?: () => void
  onRepay?: () => void
  onBorrow?: () => void
  onSupply?: () => void
  columns?: RowColumnData[]
}

export function AssetRow({ onWithdraw = () => { }, onRepay = () => { }, onBorrow = () => { }, onSupply = () => { }, columns = [] }: AssetRowProps) {
  return (
    <tr className={styles.row} onClick={onSupply}>
      {columns.map((column, index) => (
        <td key={column.key} className={styles.cell}>
          <div className={clsx(
            styles.cellContent,
          )}>
            {column.value}
          </div>
        </td>
      ))}
      <div className={styles.actions}>
        <div className={styles.content}>
          <ActionButtons
            onSupply={onSupply}
            onBorrow={onBorrow}
            onWithdraw={onWithdraw}
            onRepay={onRepay}
          />
        </div>
      </div>
    </tr>
  )
}

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
