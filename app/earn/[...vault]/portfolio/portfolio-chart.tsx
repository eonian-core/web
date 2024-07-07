import { ethers } from 'ethers'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Spacer, Tooltip } from '@nextui-org/react'
import { useVaultInputContext } from '../hooks/use-vault-input-context'
import styles from './portfolio-chart.module.scss'
import { useChart } from './use-chart'
import { ChangeIndicator } from './components/change-indicator'
import { useAppSelector } from '@/store/hooks'
import type { Vault } from '@/api'
import { FormAction } from '@/store/slices/vaultActionSlice'
import { toStringNumberFromDecimals, toUSDValue } from '@/shared'
import CompactNumber from '@/components/compact-number/compact-number'
import { Row } from '@/components/row/Row'

interface Props {
  vault: Vault
  size: number
  proportion: number
}

export function PortfolioChart({ vault, size, proportion }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useChart({
    canvas: canvasRef.current!,
    size,
    lineWidth: 10,
    animationStep: 0.01,
    value: +proportion.toFixed(2),
  })

  return (
    <div className={styles.container}>
      <AmountChangeInfo vault={vault} size={size} />
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  )
}

function AmountChangeInfo({ vault, size }: Omit<Props, 'proportion'>) {
  const ref = useRef<HTMLDivElement>(null)

  const { inputValue, formAction } = useVaultInputContext()
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const { current } = ref
    if (!current)
      return

    let maxWidth = 0
    for (const child of current.children) maxWidth = Math.max(maxWidth, (child as HTMLElement).offsetWidth)

    const scale = Math.min((size * 0.6) / maxWidth, 1)
    setScale(scale)
  }, [size, inputValue])

  const [amount, amountChange] = useAmountChange(inputValue, formAction)
  const { decimals, price, symbol: assetSymbol } = vault.asset
  const { value: tokenPrice, decimals: priceDecimals } = price
  const priceInUSD = toUSDValue(amount, decimals, tokenPrice)

  return (
    <Tooltip content={<TooltipContent />}>
      <div className={styles.info} ref={ref} style={{ transform: `scale(${scale})` }}>
        <TokenAmount vault={vault} value={amount} change={amountChange} decimals={decimals} />
        <Price value={priceInUSD} decimals={priceDecimals} />
      </div>
    </Tooltip>
  )

  function TooltipContent() {
    const valueAccurate = toStringNumberFromDecimals(amount, decimals)
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
  const threshold = useMemo(() => BigInt(1e6) * 10n ** BigInt(decimals), [decimals])
  return (
    <div className={styles.priceInUSD}>
      <CompactNumber
        value={value}
        decimals={decimals}
        threshold={threshold}
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
  const threshold = useMemo(() => BigInt(1e6) * 10n ** BigInt(decimals), [decimals])
  return (
    <div className={styles.tokenAmount}>
      <CompactNumber value={value} decimals={decimals} threshold={threshold} fractionDigits={2} hideTooltip>
        <span className={styles.asset}>{assetSymbol}</span>
        {!!change && <ChangeIndicator change={value} />}
      </CompactNumber>
    </div>
  )
}

function useAmountChange(inputValue: bigint, formAction: FormAction) {
  const { vaultBalanceBN } = useAppSelector(state => state.vaultUser)
  const currentDeposit = BigInt(vaultBalanceBN)
  const total = useMemo(() => {
    switch (formAction) {
      case FormAction.DEPOSIT:
        return currentDeposit + inputValue
      case FormAction.WITHDRAW:
        return currentDeposit < inputValue ? 0n : currentDeposit - inputValue
    }
  }, [currentDeposit, inputValue, formAction])
  return [total, total - currentDeposit] as const
}
