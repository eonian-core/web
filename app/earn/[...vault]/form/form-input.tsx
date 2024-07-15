'use client'

import { Spinner } from '@nextui-org/react'
import React from 'react'

import clsx from 'clsx'
import { ethers } from 'ethers'
import CompactNumber from '../../../components/compact-number/compact-number'
import { FractionPartView } from '../../../shared'
import styles from './form-input.module.scss'
import { RawFormInput } from './components/raw-form-input'
import { InputIcon } from './components/input-icon'
import type { TokenSymbol } from '@/types'
import type { Vault } from '@/api'
import { getAssetSymbol } from '@/earn/components/vault-card/vault-card-features'

export const INPUT_ID = 'main-form-input'

interface Props {
  label: string
  vault: Vault
  value: string
  balance: bigint
  onChange: (value: string) => void
  isLoading: boolean
  disabled: boolean
}

const FormInput: React.FC<Props> = ({ label, vault, balance, value, onChange, isLoading, disabled }) => {
  const assetSymbol = getAssetSymbol(vault)
  const decimals = vault.asset.decimals

  const handleInputValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange],
  )

  return (
    <RawFormInput
      label={label}
      vault={vault}
      id={INPUT_ID}
      className={styles.input}
      value={value}
      placeholder="0"
      onChange={handleInputValueChange}
      disabled={disabled || isLoading}
      inputStart={<InputIcon type='INPUT' vault={vault} />}
      headerEnd={
        <Balance
          balance={balance}
          isLoading={isLoading}
          decimals={decimals}
          assetSymbol={assetSymbol}
          disabled={disabled}
          onChange={onChange}
        />
      }
    />
  )
}

interface BalanceProps extends Omit<Props, 'value' | 'label' | 'vault'> {
  decimals: number
  assetSymbol: TokenSymbol
}

function Balance({ balance, isLoading, decimals, assetSymbol, onChange, disabled }: BalanceProps) {
  if (isLoading)
    return <Spinner className={styles.loading} size="sm" />

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
        tooltipContent={value => `${value} ${assetSymbol}`}
        childrenAtStart
      >
        Balance:&nbsp;
      </CompactNumber>
    </span>
  )
}

export default FormInput
