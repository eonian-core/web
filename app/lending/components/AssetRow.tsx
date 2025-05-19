import clsx from 'clsx'
import type { ColumnKey } from '../hooks/useColumns'
import { ActionButtons } from './ActionButtons'
import styles from './AssetRow.module.scss'

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
    <tr className={styles.row}>
      {columns.map((column, index) => (
        <td key={column.key} className={styles.cell}>
          <div className={clsx(
            styles.cellContent,
            index === 0 ? styles.start : styles.center,
          )}>
            {column.value}
          </div>
        </td>
      ))}
      <td className={styles.actions}>
        <div className={styles.content}>
          <ActionButtons
            onWithdraw={onWithdraw}
            onRepay={onRepay}
            onBorrow={onBorrow}
            onSupply={onSupply}
          />
        </div>
      </td>
    </tr>
  )
}
