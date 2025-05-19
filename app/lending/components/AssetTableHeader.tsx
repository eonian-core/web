import type { ColumnWithValues } from '../hooks/useColumnsWithValues'
import styles from './AssetTableHeader.module.scss'

export interface AssetTableHeaderProps {
  columns: ColumnWithValues[]
}

export function AssetTableHeader({ columns }: AssetTableHeaderProps) {
  if (!columns || columns.length === 0)
    return null

  return (
    <thead className={styles.tableHeader}>
      <tr className={styles.row}>
        {columns.map(column => (
          <th key={column.key} className={styles.cell}>
            {column.label}
          </th>
        ))}
        <th className={styles.actionCell}>
          {/* Intentionally empty - actions in rows */}
        </th>
      </tr>
    </thead>
  )
}
