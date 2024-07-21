import clsx from 'clsx'
import { ethers } from 'ethers'
import { INPUT_ID } from '../form-input'
import styles from './balance.module.scss'
import { FractionPartView } from '@/shared'
import CompactNumber from '@/components/compact-number/compact-number'
import type { Vault } from '@/api'

interface Props {
  balance: bigint
  decimals: number
  disabled: boolean
  vault: Vault
  onChange: (value: string) => void
}

export function Balance({ balance, decimals, onChange, vault, disabled }: Props) {
  const handleClick = () => {
    const value = ethers.formatUnits(balance, decimals)
    onChange(Number.isNaN(+value) || +value === 0 ? '0' : value)
    const input = document.getElementById(INPUT_ID)
    input?.focus()
  }

  const classNames = clsx(styles.balance, { [styles.balanceDisabled]: disabled })
  return (
    <span className={classNames} onClick={handleClick} tabIndex={-1}>
      <CompactNumber
        value={balance}
        decimals={decimals}
        threshold={0n}
        fractionDigits={2}
        fractionPartView={FractionPartView.CUT}
        hideTooltip
        childrenAtStart
      >
        Balance:&nbsp;
      </CompactNumber>
      &nbsp;{vault.asset.symbol}
    </span>
  )
}
