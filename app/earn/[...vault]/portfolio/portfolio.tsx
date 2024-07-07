import { ethers } from 'ethers'
import { useMemo } from 'react'
import { useVaultInputContext } from '../hooks/use-vault-input-context'
import styles from './portfolio.module.scss'
import { PortfolioChart } from './portfolio-chart'
import { PortfolioLegend } from './portfolio-legend'
import type { Vault } from '@/api'
import { useAppSelector } from '@/store/hooks'
import { toStringNumberFromDecimals } from '@/shared'
import CompactNumber from '@/components/compact-number/compact-number'
import { FormAction } from '@/store/slices/vaultActionSlice'

interface Props {
  vault: Vault
}

export function Portfolio({ vault }: Props) {
  const { inputValue, formAction } = useVaultInputContext()
  const { walletBalanceBN, vaultBalanceBN } = useAppSelector(state => state.vaultUser)

  const proportion = useVaultAssetProportion({
    inputValue,
    decimals: vault.asset.decimals,
    formAction,
    walletBalanceBN,
    vaultBalanceBN,
  })

  return (
    <div id="portfolio" className={styles.container}>
      <div className={styles.header}>
        <h2>Your Portfolio</h2>
        <SubHeader />
      </div>
      <PortfolioChart vault={vault} size={160} proportion={proportion} />
      <PortfolioLegend className={styles.legend} proportion={proportion} />
    </div>
  )

  function SubHeader() {
    const { symbol, decimals } = vault.asset
    const threshold = BigInt(1e6) * 10n ** BigInt(decimals)

    let value = inputValue
    let action = 'deposit'

    if (formAction === FormAction.WITHDRAW) {
      const vaultBalance = BigInt(vaultBalanceBN)
      if (inputValue > vaultBalance)
        value = vaultBalance

      action = 'withdraw'
    }

    return (
      <h3>
        After a {action} of&nbsp;
        <CompactNumber value={value} decimals={decimals} threshold={threshold} fractionDigits={2} hideTooltip>
          &nbsp;<span className={styles.asset}>{symbol}</span>
        </CompactNumber>
      </h3>
    )
  }
}

interface ProportionOptions {
  inputValue: bigint
  decimals: number
  formAction: FormAction
  walletBalanceBN: string
  vaultBalanceBN: string
}

function useVaultAssetProportion({
  inputValue,
  decimals,
  formAction,
  walletBalanceBN,
  vaultBalanceBN,
}: ProportionOptions) {
  const inputDelta = +ethers.formatUnits(inputValue, decimals)
  const walletBalance = +ethers.formatUnits(walletBalanceBN, decimals)
  const vaultBalance = +ethers.formatUnits(vaultBalanceBN, decimals)

  const sign = formAction === FormAction.DEPOSIT ? 1 : -1
  const change = sign * inputDelta

  const vaultDelta = vaultBalance + change
  const walletDelta = Math.max(walletBalance - change, 0)

  if (vaultDelta + walletDelta === 0)
    return 0

  return vaultDelta / (vaultDelta + walletDelta)
}
