import { ethers } from 'ethers'
import { useVaultInputContext } from '../hooks/use-vault-input-context'
import styles from './portfolio.module.scss'
import { PortfolioChart } from './portfolio-chart'
import { PortfolioLegend } from './portfolio-legend'
import type { Vault } from '@/api'
import { useAppSelector } from '@/store/hooks'
import { toStringNumberFromDecimals } from '@/shared'
import CompactNumber from '@/components/compact-number/compact-number'

interface Props {
  vault: Vault
}

export function Portfolio({ vault }: Props) {
  const { inputValue, formAction } = useVaultInputContext()
  const proportion = useVaultAssetProportion(vault, inputValue)
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
    return (
      <h3>
        After a deposit of&nbsp;
        <CompactNumber value={inputValue} decimals={decimals} threshold={threshold} fractionDigits={2} hideTooltip>
          &nbsp;<span className={styles.asset}>{symbol}</span>
        </CompactNumber>
      </h3>
    )
  }
}

function useVaultAssetProportion(vault: Vault, inputValue: bigint) {
  const { decimals } = vault.asset

  const { walletBalanceBN, vaultBalanceBN } = useAppSelector(state => state.vaultUser)

  const inputDelta = +ethers.formatUnits(inputValue, decimals)
  const walletBalance = +ethers.formatUnits(walletBalanceBN, decimals)
  const vaultBalance = +ethers.formatUnits(vaultBalanceBN, decimals)

  const vaultDelta = vaultBalance + inputDelta
  const walletDelta = Math.max(walletBalance - inputDelta, 0)

  if (vaultDelta + walletDelta === 0)
    return 0

  return vaultDelta / (vaultDelta + walletDelta)
}
