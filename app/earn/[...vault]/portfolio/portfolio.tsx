import { ethers } from 'ethers'
import { useVaultContext } from '../hooks/use-vault-context'
import { SectionHeader, SectionSubHeader } from '../components/section-header/section-header'
import styles from './portfolio.module.scss'
import { PortfolioChart } from './portfolio-chart'
import { PortfolioLegend } from './portfolio-legend'
import { useAppSelector } from '@/store/hooks'
import CompactNumber from '@/components/compact-number/compact-number'
import { FormAction } from '@/store/slices/vaultActionSlice'

export function Portfolio() {
  const { inputValue = 0n, showPlaceholder, placeholderValue, formAction, vault } = useVaultContext()
  const { walletBalanceBN, vaultBalanceBN } = useAppSelector(state => state.vaultUser)
  const decimals = vault.asset.decimals
  const proportion = useVaultAssetProportion({
    inputValue: showPlaceholder ? placeholderValue : inputValue,
    decimals,
    formAction,
    walletBalanceBN,
    vaultBalanceBN,
  })

  return (
    <div id="portfolio" className={styles.container}>
      <SectionHeader title="Your Portfolio">
        <SubHeader {...{
          ...vault.asset,
          vaultBalanceBN,
          formAction,
          decimals,
          value: showPlaceholder ? placeholderValue : inputValue,
        }}
        />
      </SectionHeader>
      <PortfolioChart size={160} proportion={proportion} />
      <PortfolioLegend className={styles.legend} proportion={proportion} />
    </div>
  )
}

export interface SubHeaderProps extends Omit<SubHeaderBodyProps, 'children'> {
  formAction: FormAction
  vaultBalanceBN: string
}

function SubHeader({ formAction, value, vaultBalanceBN, ...props }: SubHeaderProps) {
  if (formAction === FormAction.DEPOSIT)
    return <SubHeaderBody {...props} value={value}>After saving of</SubHeaderBody>

  const vaultBalance = BigInt(vaultBalanceBN)
  return (
    <SubHeaderBody
      {...props}
      value={value > vaultBalance ? vaultBalance : value}
    >
     After withdraw of
    </SubHeaderBody>
  )
}

export interface SubHeaderBodyProps {
  children: string
  value: bigint
  decimals: number
  symbol: string
}

function SubHeaderBody({ children: action, value, decimals, symbol }: SubHeaderBodyProps) {
  return (
    <SectionSubHeader>
      {action}&nbsp;
      <CompactNumber value={value} decimals={decimals} fractionDigits={2} hideTooltip>
        &nbsp;<span className={styles.asset}>{symbol}</span>
      </CompactNumber>
    </SectionSubHeader>
  )
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
