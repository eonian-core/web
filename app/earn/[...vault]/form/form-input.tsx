'use client'

import React from 'react'

import { useVaultContext } from '../hooks/use-vault-context'
import styles from './form-input.module.scss'
import { Price, RawFormInput } from './components/raw-form-input'
import { WalletInputIcon } from './components/input-icon'
import { BalanceWithSetter } from './BalanceWithSetter'
import { useAppSelector } from '@/store/hooks'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'

export const INPUT_ID = 'main-form-input'

export function focusOnInput() {
  const input = document.getElementById(INPUT_ID)
  input?.focus()
}

interface FormInputProps {
  disabled: boolean
}

const FormInput: React.FC<FormInputProps> = ({ disabled }) => {
  const { displayValue, onValueChange, vault } = useVaultContext()
  const { walletBalanceBN } = useAppSelector(state => state.vaultUser)
  const { status } = useWalletWrapperContext()

  return (
    <RawFormInput
      label={'Wallet'}
      id={INPUT_ID}
      className={styles.input}
      placeholder="0"
      onChange={event => onValueChange(event.target.value)}
      disabled={disabled}
      inputStart={<WalletInputIcon />}
      headerEnd={status === WalletStatus.CONNECTED
        && <BalanceWithSetter {...{
          disabled,
          balance: BigInt(walletBalanceBN),
        }} />}
      price={<Price vault={vault}>{displayValue}</Price>}
    >{displayValue}</RawFormInput>
  )
}

export default FormInput
