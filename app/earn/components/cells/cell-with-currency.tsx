import { Spacer, Tooltip } from '@nextui-org/react'
import React from 'react'
import CompactNumber from '../../../components/compact-number/compact-number'
import { toStringNumberFromDecimals } from '../../../shared'
import { Row } from '../../../components/row/Row'
import { CellWithDescription } from './cell-with-description'

interface Props {
  value: bigint
  decimals: number
  valueUSD: bigint
  decimalsUSD: number
  symbol: string
  isLoading?: boolean
}

export const CellWithCurrency: React.FC<Props> = ({ value, valueUSD, decimals, decimalsUSD, symbol, isLoading }) => {
  return (
    <Tooltip content={<TooltipContent
      {...{
        value,
        decimals,
        valueUSD,
        decimalsUSD,
        symbol,
      }}
    />}>
      <CellWithDescription
        description={
          <ValueNumber value={valueUSD} decimals={decimalsUSD} currencyAtStart>
            $
          </ValueNumber>
        }
        isLoading={isLoading}
      >
        <ValueNumber value={value} decimals={decimals}>
          &nbsp;{symbol}
        </ValueNumber>
      </CellWithDescription>
    </Tooltip>
  )
}

export interface TooltipContentProps {
  value: bigint
  decimals: number
  valueUSD: bigint
  decimalsUSD: number
  symbol: string
}

function TooltipContent({ value, decimals, valueUSD, decimalsUSD, symbol }: TooltipContentProps) {
  const valueAccurate = toStringNumberFromDecimals(value, decimals)
  const valueUSDAccurate = toStringNumberFromDecimals(valueUSD, decimalsUSD)
  return (
    <>
      <Row justify="center">
        {valueAccurate}&nbsp;{symbol}
      </Row>
      <Spacer y={0.5} />
      <Row justify="center">${valueUSDAccurate}</Row>
    </>
  )
}

interface ValueNumberProps extends React.PropsWithChildren {
  value: bigint
  decimals: number
  currencyAtStart?: boolean
}

function ValueNumber({ value, decimals, currencyAtStart, children }: ValueNumberProps) {
  const threshold = BigInt(1e6) * 10n ** BigInt(decimals)
  return (
    <CompactNumber
      value={value}
      decimals={decimals}
      threshold={threshold}
      fractionDigits={2}
      hideTooltip
      childrenAtStart={currencyAtStart}
    >
      {children}
    </CompactNumber>
  )
}
