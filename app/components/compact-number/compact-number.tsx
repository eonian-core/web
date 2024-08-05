import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { Tooltip } from '@nextui-org/react'
import { useAppSelector } from '../../store/hooks'
import { toStringNumberFromDecimals } from '../../shared'
import type { FractionPartView } from '@/finances/humanize'
import { formatNumberCompactWithThreshold } from '@/finances/humanize'

export interface CompactBigIntOptions {
  threshold?: bigint
  fractionDigits?: number
  fractionPartView?: FractionPartView
  locale?: string
}

export function useCompactBigInt(value: bigint, decimals: number, options: CompactBigIntOptions) {
  return useMemo(() => {
    const threshold = options.threshold ?? BigInt(1e6) * 10n ** BigInt(decimals)
    const formattedValue = formatNumberCompactWithThreshold(value, decimals, {
      ...options,
      threshold,
    })

    return formattedValue
  }, [value, decimals, options])
}

interface CompactNumberProps extends Omit<RawCompactNumberProps, 'value' | 'accurateValue' | 'tooltipContent'> {
  value: bigint
  decimals: number
  hideTooltip?: boolean
  tooltipContent?: (value: string) => React.ReactNode
}

const passFunc = (value: string) => value

const CompactNumber: React.FC<CompactNumberProps> = ({
  value,
  decimals,
  tooltipContent = passFunc,
  hideTooltip = false,
  ...props
}) => {
  const locale = useAppSelector(state => state.locale.current)
  const formattedValue = useCompactBigInt(value, decimals, { locale, ...props })

  return <RawCompactNumber {...{
    value: formattedValue.result,
    tooltipContent: hideTooltip ? null : tooltipContent(toStringNumberFromDecimals(value, decimals)),
    ...props,
  }} />
}

export default React.memo(CompactNumber)

interface RawCompactNumberProps extends CompactBigIntOptions, CompactNumberContentProps {
  value: string
  tooltipContent: React.ReactNode
  className?: string
}

export function RawCompactNumber({
  className,
  tooltipContent,
  ...props
}: RawCompactNumberProps) {
  if (!tooltipContent)
    return <CompactNumberContent {...props}/>

  return (
    <Tooltip
      className={className}
      content={tooltipContent}
      >
        <CompactNumberContent {...props}/>
    </Tooltip>
  )
}

interface CompactNumberContentProps extends PropsWithChildren {
  childrenAtStart?: boolean
  value: string
}

export function CompactNumberContent({ children, childrenAtStart, value }: CompactNumberContentProps) {
  return (<>
    {childrenAtStart && children}
    <span>{value}</span>
    {!childrenAtStart && children}
  </>)
}
