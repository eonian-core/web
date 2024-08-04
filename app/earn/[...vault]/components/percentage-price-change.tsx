import { Tooltip } from '@nextui-org/react'
import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './percentage-price-change.module.scss'
import { formatUSD } from '@/finances/humanize/format-currency'
import { formatPercent } from '@/finances/humanize/format-persent'

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
  const { percent, prefix } = formatPercent(change)
  return (
    <div className={clsx(styles.container, className)} style={{ color: getChangeColor(change) }}>
      <Tooltip content={<TooltipContent
        label={tooltipLabel}
        {...{ currentPrice, previousPrice, prefix }}
      />}>
        <div>
          {percent}{children}
        </div>
      </Tooltip>
    </div>
  )
}

interface TooltipContentProps {
  currentPrice: number
  previousPrice: number
  prefix: string
  label?: string
}

function TooltipContent({ label, prefix, currentPrice, previousPrice }: TooltipContentProps) {
  return (
    <>
      {label}
      <b>
        {prefix}
        {formatUSD(Math.abs(currentPrice - previousPrice))}
      </b>
    </>
  )
}

export function getChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100
}

export function getChangeColor(change: number): string {
  return `var(${change > 0 ? '--color-positive' : '--color-negative'})`
}
