import clsx from 'clsx'

import type { MouseEventHandler } from 'react'
import styles from './balance.module.scss'
import CompactNumber from '@/components/compact-number/compact-number'
import { FractionPartView } from '@/finances/humanize'
import type { Vault } from '@/types'

interface Props {
  balance: bigint
  decimals: number
  disabled: boolean
  vault: Vault
  onClick?: MouseEventHandler<any>
}

export function Balance({ balance, decimals, onClick, vault, disabled }: Props) {
  return (
    <span
      className={clsx(styles.balance, { [styles.balanceDisabled]: disabled })}
      onClick={onClick}
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
