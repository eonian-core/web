import clsx from 'clsx'
import { ethers } from 'ethers'
import { useCallback } from 'react'
import { focusOnInput } from '../form-input'
import styles from './balance.module.scss'
import CompactNumber from '@/components/compact-number/compact-number'
import type { Vault } from '@/api'
import { FractionPartView } from '@/finances/humanize'

interface Props {
  balance: bigint
  decimals: number
  disabled: boolean
  vault: Vault
  onChange: (value: string) => void
}

export function Balance({ balance, decimals, onChange, vault, disabled }: Props) {
  const handleClick = useCallback(() => {
    const value = ethers.formatUnits(balance, decimals)
    onChange(Number.isNaN(+value) || +value === 0 ? '0' : value)

    focusOnInput()
  }, [balance, decimals, onChange])

  return (
    <span
      className={clsx(styles.balance, { [styles.balanceDisabled]: disabled })}
      onClick={handleClick}
      tabIndex={-1}
    >
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
