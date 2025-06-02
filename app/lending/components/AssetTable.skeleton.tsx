import { Card, CardBody } from '@heroui/react'
import React from 'react'
import { AssetRowSkeleton } from './AssetRow.skeleton'
import { AssetTableHeaderSkeleton } from './AssetTableHeader.skeleton'
import styles from './AssetTable.module.scss'

export function AssetTableSkeleton({ rows, columns }: { rows: number; columns: number }) {
  return (
    <Card className={styles.card}>
      <CardBody className={styles.cardBody}>
        <table>
          <AssetTableHeaderSkeleton columns={columns} />
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <AssetRowSkeleton
                key={index}
                columns={columns}
                />
            ),
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}
