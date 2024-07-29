import { ethers } from 'ethers'
import styles from './raw-form-input.module.scss'
import CompactNumber from '@/components/compact-number/compact-number'
import type { Vault } from '@/api'
import { getAmountInUSD } from '@/finances/humanize'
import { formatUSD } from '@/finances/humanize/format-currency'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  vault: Vault
  inputStart?: React.ReactNode
  headerEnd?: React.ReactNode
}

export function RawFormInput({ label, value, vault, inputStart, headerEnd, ...restProps }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{label}</h3>
        {headerEnd}
      </div>
      <div className={styles.content}>
        <div className={styles.inputStart}>{inputStart}</div>
        <input className={styles.input} value={value} autoComplete="off" {...restProps} />
        <div className={styles.description}>
          <Price />
        </div>
      </div>
    </div>
  )

  function Price() {
    const stringValue = String(value || 0)
    const amount = ethers.parseUnits(stringValue, vault.asset.decimals)
    const [amountInUSD, decimals] = getAmountInUSD(amount, vault)

    const stringValueUSD = ethers.formatUnits(amountInUSD, decimals)
    const valueUSD = +stringValueUSD
    const useApprox = valueUSD > 0
    if (valueUSD <= Number.MAX_SAFE_INTEGER)
      return <>{useApprox ? '≈ ' : ''}{formatUSD(valueUSD)}</>

    return (
      <CompactNumber value={amountInUSD} decimals={decimals} fractionDigits={2} hideTooltip childrenAtStart>
        <>≈ $</>
      </CompactNumber>
    )
  }
}
