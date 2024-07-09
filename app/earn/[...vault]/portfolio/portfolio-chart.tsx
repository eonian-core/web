'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Spacer, Tooltip } from '@nextui-org/react'
import { useVaultDeposit } from '../hooks/use-vault-deposit-change'
import styles from './portfolio-chart.module.scss'
import { useChart } from './use-chart'
import { ChangeIndicator } from './components/change-indicator'
import type { Vault } from '@/api'
import { toStringNumberFromDecimals, toUSDValue } from '@/shared'
import CompactNumber from '@/components/compact-number/compact-number'
import { Row } from '@/components/row/Row'

interface Props {
  vault: Vault
  size: number
  proportion: number
}

export function PortfolioChart({ vault, size, proportion }: Props) {
  useChart({
    size,
    lineWidth: 10,
    animationStep: 0.01,
    value: +proportion.toFixed(2),
  })

  return (
    <div className={styles.container}>
      <AmountChangeInfo vault={vault} size={size} />
      <canvas id="portfolio-chart" width={size} height={size} />
    </div>
  )
}

function AmountChangeInfo({ vault, size }: Omit<Props, 'proportion'>) {
  const ref = useRef<HTMLDivElement>(null)

  const [scale, setScale] = useState(1)

  const [total, change] = useVaultDeposit()
  const { decimals, price, symbol: assetSymbol } = vault.asset
  const { value: tokenPrice, decimals: priceDecimals } = price
  const priceInUSD = toUSDValue(total, decimals, tokenPrice)

  useLayoutEffect(() => {
    const { current } = ref
    if (!current)
      return

    let maxWidth = 0
    for (const child of current.children) maxWidth = Math.max(maxWidth, (child as HTMLElement).offsetWidth)

    const scale = Math.min((size * 0.6) / maxWidth, 1)
    setScale(scale)
  }, [size, total, change])

  return (
    <Tooltip content={<TooltipContent />}>
      <div className={styles.info} ref={ref} style={{ transform: `scale(${scale})` }}>
        <TokenAmount vault={vault} value={total} change={change} decimals={decimals} />
        <Price value={priceInUSD} decimals={priceDecimals} />
      </div>
    </Tooltip>
  )

  function TooltipContent() {
    const valueAccurate = toStringNumberFromDecimals(total, decimals)
    const valueUSDAccurate = toStringNumberFromDecimals(priceInUSD, priceDecimals)
    return (
      <>
        <Row justify="center">
          {valueAccurate}&nbsp;{assetSymbol}
        </Row>
        <Spacer y={0.5} />
        <Row justify="center">${valueUSDAccurate}</Row>
      </>
    )
  }
}

interface PriceProps {
  value: bigint
  decimals: number
}

function Price({ value, decimals }: PriceProps) {
  return (
    <div className={styles.priceInUSD}>
      <CompactNumber
        value={value}
        decimals={decimals}
        fractionDigits={2}
        hideTooltip
        childrenAtStart
      >
        <>$</>
      </CompactNumber>
    </div>
  )
}

interface TokenAmountProps extends PriceProps {
  vault: Vault
  change: bigint
}

function TokenAmount({ value, decimals, vault, change }: TokenAmountProps) {
  const { symbol: assetSymbol } = vault.asset
  return (
    <div className={styles.tokenAmount}>
      <CompactNumber value={value} decimals={decimals} fractionDigits={2} hideTooltip>
        <span className={styles.asset}>{assetSymbol}</span>
        {!!change && <ChangeIndicator change={change} />}
      </CompactNumber>
    </div>
  )
}
