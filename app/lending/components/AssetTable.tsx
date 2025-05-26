import { Card, CardBody } from '@heroui/react'
import React from 'react'
import type { ColumnWithValues } from '../hooks/useColumnsWithValues'
import type { RowColumnData } from './AssetRow'
import { AssetRow } from './AssetRow'
import { AssetTableHeader } from './AssetTableHeader'
import styles from './AssetTable.module.scss'

interface AssetTableProps {
  columns: ColumnWithValues[]

  onWithdraw: (rowIndex: number) => void
  onRepay: (rowIndex: number) => void
  onBorrow: (rowIndex: number) => void
  onSupply: (rowIndex: number) => void
}

export function AssetTable({ columns, onWithdraw, onRepay, onBorrow, onSupply }: AssetTableProps) {
  const rows = React.useMemo((): RowColumnData[][] => {
    const firstColumn = columns[0]
    const isValid = columns.every(column => firstColumn.contentOfCells.length === column.contentOfCells.length)
    if (!isValid)
      throw new Error('All columns must have the same number of cells')

    return firstColumn.contentOfCells.map((_, index) => {
      return columns.map((column) => {
        return {
          key: column.key,
          label: column.label,
          value: column.contentOfCells[index],
        }
      })
    })
  }, [columns])

  return (
    <Card className={styles.card}>
      <CardBody className={styles.cardBody}>
        <table>
          <AssetTableHeader columns={columns} />
          <tbody>
            {rows.map((rowData, index) => (
              <AssetRow
                key={index}
                onWithdraw={() => onWithdraw(index)}
                onRepay={() => onRepay(index)}
                onBorrow={() => onBorrow(index)}
                onSupply={() => onSupply(index)}
                columns={rowData}
                  />
            ),
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}
