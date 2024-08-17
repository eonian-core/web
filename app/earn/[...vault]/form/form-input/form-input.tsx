'use client'

import React from 'react'

import { useVaultContext } from '../../hooks/use-vault-context'
import { RawFormInput } from '../raw-form-input/raw-form-input'
import { WalletInputIcon } from '../input-icon/input-icon'
import { BalanceWithSetter } from '../balance/balance-with-setter'
import { Price } from '../price/price'
import styles from './form-input.module.scss'
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
  const { displayValue, placeholderDisplayValue, onValueChange, vault, formAction } = useVaultContext()
  const { walletBalanceBN } = useAppSelector(state => state.vaultUser)
  const { status } = useWalletWrapperContext()

  return (
    <RawFormInput
      label={'Wallet'}
      id={INPUT_ID}
      className={styles.input}
      placeholder={placeholderDisplayValue}
      onChange={event => onValueChange(event.target.value)}
      disabled={disabled}
      inputStart={<WalletInputIcon />}
      headerEnd={
        status === WalletStatus.CONNECTED && (
          <BalanceWithSetter
            {...{
              disabled,
              balance: BigInt(walletBalanceBN),
            }}
          />
        )
      }
      price={<Price vault={vault}>{displayValue || placeholderDisplayValue}</Price>}
    >
      {displayValue || ''}
    </RawFormInput>
  )
}

export default FormInput
