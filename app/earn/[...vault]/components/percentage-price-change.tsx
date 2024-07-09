import { Tooltip } from '@nextui-org/react'
import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './percentage-price-change.module.scss'
import { formatUSD } from '@/shared/humanize/format-currency'

interface Props {
  currentPrice?: number
  previousPrice?: number
  tooltipLabel?: string
  className?: string
}

export function PercentagePriceChange({
  currentPrice = 0,
  previousPrice = 0,
  tooltipLabel,
  className,
  children,
}: PropsWithChildren<Props>) {
  const change = getChange(currentPrice, previousPrice)
  const prefix = change > 0 ? '+' : '-'
  const classNames = clsx(styles.container, className)
  return (
    <div className={classNames} style={{ color: getChangeColor(change) }}>
      <Tooltip content={<TooltipContent />}>
        <div>
          {prefix}
          {Math.abs(change).toFixed(2)}%{children}
        </div>
      </Tooltip>
    </div>
  )

  function TooltipContent() {
    return (
      <>
        {tooltipLabel}
        <b>
          {prefix}
          {formatUSD(Math.abs(currentPrice - previousPrice))}
        </b>
      </>
    )
  }
}

export function getChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100
}

export function getChangeColor(change: number): string {
  return `var(${change > 0 ? '--color-positive' : '--color-negative'})`
}
