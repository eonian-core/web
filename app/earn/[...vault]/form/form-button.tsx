'use client'

import React from 'react'
import type { ButtonProps } from '@nextui-org/react'
import { Button, Spinner } from '@nextui-org/react'

import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import type { Chain } from '../../../providers/wallet/wrappers/types'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { FormAction } from '../../../store/slices/vaultActionSlice'
import { useExecuteTransaction, useVaultUserInfo } from '../hooks'
import { useVaultInputContext } from '../hooks/use-vault-input-context'
import styles from './form-button.module.scss'
import type { Vault } from '@/api'

interface Props extends Omit<ButtonProps, 'onSubmit'> {
  formAction: FormAction
  vaultChain: Chain
  vault: Vault
  isLoading?: boolean
}

const FormButton: React.FC<Props> = ({ formAction, vaultChain, isLoading, disabled, vault, ...restProps }) => {
  const { status, connect, chain, setCurrentChain } = useWalletWrapperContext()

  const { onValueChange, inputValue } = useVaultInputContext()
  const executeTransaction = useExecuteTransaction()
  const refetechVaultUserData = useVaultUserInfo(vault, {
    autoUpdateInterval: 5000,
  })

  const isOnDifferentChain = vaultChain.id !== chain?.id

  const submit = async (formAction: FormAction) => {
    // Refresh vault <-> user data before the transaction to make sure all calculations are correct.
    await refetechVaultUserData!()

    // Execute Deposit/Withdraw transaction
    const success = await executeTransaction(formAction, vault, inputValue)
    if (success) {
      // Refresh wallet balance & vault deposit after the transaction executed.
      void refetechVaultUserData!()

      // Reset form input
      onValueChange(0n)
    }
  }

  const handlePress = () => {
    switch (status) {
      case WalletStatus.NOT_CONNECTED: {
        void connect()
        return
      }
      case WalletStatus.CONNECTED: {
        if (isOnDifferentChain) {
          void setCurrentChain(vaultChain.id)
          return
        }
        void submit(formAction)
      }
    }
  }

  return (
    <Button
      auto
      color="primary"
      size="lg"
      className={styles.button}
      onPress={handlePress}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading ? <Spinner color="current" size="md" /> : getText()}
    </Button>
  )

  function getText() {
    switch (status) {
      case WalletStatus.NOT_CONNECTED:
        return 'Connect to a wallet'
      case WalletStatus.CONNECTING:
        return 'Connecting to a wallet...'
      case WalletStatus.CONNECTED: {
        if (isOnDifferentChain)
          return `Switch to ${vaultChain.name}`

        return formAction === FormAction.DEPOSIT ? 'Deposit' : 'Withdraw'
      }
    }
  }
}

export default FormButton
