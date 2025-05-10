import { Card, CardBody } from '@heroui/react'
import React from 'react'
import type { ColumnWithValues } from '../hooks/useColumnsWithValues'
import type { RowColumnData } from './AssetRow'
import { AssetRow } from './AssetRow'

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
    <Card className="w-full bg-default-800 border border-default-700 shadow-xl rounded-xl overflow-hidden">
      <CardBody className="px-0 py-0">
        <table className="w-full">
          <thead className="bg-default-850">
            <tr className="border-b border-default-700">
              {columns.map(column => (
                <th key={column.key} className="p-3 text-xs text-foreground-300 font-medium text-center">
                  {column.label}
                </th>
              ))}
              <th className="flex-1 p-3 text-right text-xs text-foreground-300 font-medium laptop:min-w-[176px]">
                {/* Intentionally empty - actions in rows */}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((rowData, index) => {
              return (
                <AssetRow
                  key={index}
                  onWithdraw={() => onWithdraw(index)}
                  onRepay={() => onRepay(index)}
                  onBorrow={() => onBorrow(index)}
                  onSupply={() => onSupply(index)}
                  columns={rowData}
                />
              )
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}
