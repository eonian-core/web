import { Skeleton } from '@heroui/react'
import type { ColumnWithValues } from '../hooks/useColumnsWithValues'

interface Props {
  columns: ColumnWithValues[]
}

export default function SkeletonPage({ columns }: Props) {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 bg-transparent">
      {/* Header skeleton */}
      <div className="flex flex-col mb-8">
        <Skeleton classNames={{ base: 'h-10 w-2/5 mb-2' }} />
        <Skeleton classNames={{ base: 'h-5 w-1/3' }} />
      </div>

      {/* MarketStats skeleton */}
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-1 w-36">
          <Skeleton classNames={{ base: 'h-5 w-3/4' }} />
          <Skeleton classNames={{ base: 'h-8 w-2/3' }} />
        </div>
        <div className="flex mb-6 flex-1 justify-end">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1 w-36">
              <Skeleton classNames={{ base: 'h-5 w-3/4' }} />
              <Skeleton classNames={{ base: 'h-8 w-2/3' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Table title skeleton */}
      <Skeleton classNames={{ base: 'h-7 w-24 mb-4' }} />

      {/* Table header skeleton */}
      <div className="flex mb-3 gap-2">
        {columns.map((_, i) => (
          <Skeleton key={i} classNames={{ base: 'h-5 flex-1' }} />
        ))}
        <Skeleton classNames={{ base: 'h-5 w-24' }} />
      </div>

      {/* Table rows skeleton */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} classNames={{ base: 'h-14 w-full mb-1' }} />
      ))}
    </div>
  )
}
