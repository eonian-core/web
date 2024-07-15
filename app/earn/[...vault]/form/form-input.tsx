'use client'

import React from 'react'

import { useVaultInputContext } from '../hooks/use-vault-input-context'
import styles from './form-input.module.scss'
import { RawFormInput } from './components/raw-form-input'
import { InputIcon } from './components/input-icon'
import { Balance } from './components/balance'
import type { Vault } from '@/api'
import { FormAction } from '@/store/slices/vaultActionSlice'
import { useAppSelector } from '@/store/hooks'

export const INPUT_ID = 'main-form-input'

interface Props {
  vault: Vault
  disabled: boolean
}

const FormInput: React.FC<Props> = ({ vault, disabled }) => {
  const { formAction, displayValue, onValueChange } = useVaultInputContext()

  const label = formAction === FormAction.DEPOSIT ? 'From Your Wallet' : 'From Your Account'

  return (
    <RawFormInput
      label={label}
      vault={vault}
      id={INPUT_ID}
      className={styles.input}
      value={displayValue}
      placeholder="0"
      onChange={event => onValueChange(event.target.value)}
      disabled={disabled}
      inputStart={<InputIcon type='INPUT' vault={vault} />}
      headerEnd={<InputBalance />}
    />
  )

  function InputBalance() {
    const { vaultBalanceBN, walletBalanceBN } = useAppSelector(state => state.vaultUser)
    const value = formAction === FormAction.DEPOSIT ? walletBalanceBN : vaultBalanceBN
    return <Balance vault={vault} balance={BigInt(value)} decimals={vault.asset.decimals} onChange={onValueChange} disabled={disabled} />
  }
}

export default FormInput
