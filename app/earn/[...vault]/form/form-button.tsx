'use client'

import type { PropsWithChildren } from 'react'
import React, { useCallback, useState } from 'react'
import type { ButtonProps } from '@nextui-org/react'
import { Button, Spinner } from '@nextui-org/react'

import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import type { Chain } from '../../../providers/wallet/wrappers/types'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { FormAction } from '../../../store/slices/vaultActionSlice'
import { useExecuteTransaction, useVaultUserInfo } from '../hooks'
import { useVaultContext } from '../hooks/use-vault-context'
import styles from './form-button.module.scss'

interface Props extends Omit<ButtonProps, 'onSubmit'> {
  vaultChain: Chain
  isLoading?: boolean
}

const FormButton: React.FC<Props> = ({ vaultChain, isLoading, disabled, ...restProps }) => {
  const { status, connect, chain, setCurrentChain } = useWalletWrapperContext()

  const { formAction, insured, setInsured } = useVaultContext()
  const [submit, isSubmiting] = useSubmit()

  const isOnDifferentChain = vaultChain.id !== chain?.id
  const handlePress = useCallback(() => {
    if (!insured)
      return setInsured(true)

    if (status === WalletStatus.NOT_CONNECTED) {
      void connect()
      return
    }

    if (isOnDifferentChain) {
      void setCurrentChain(vaultChain.id)
      return
    }

    void submit(formAction)
  }, [insured, setInsured, status, isOnDifferentChain, formAction, connect, setCurrentChain, submit, vaultChain.id])

  return (
    <div className={styles.wrapper}>
      <Button
        auto
        color="primary"
        size="lg"
        className={styles.button}
        onPress={handlePress}
        disabled={disabled || isLoading || isSubmiting}
        {...restProps}
      >
        {(isLoading || isSubmiting)
          ? <Spinner color="current" size="md" />
          : <ButtonText {...{
            insured,
            status,
            isOnDifferentChain,
            chainName: vaultChain.name,
            formAction,
          }} />}
      </Button>
    </div>
  )
}

export default FormButton

function useSubmit() {
  const { onValueChange, inputValue, vault } = useVaultContext()
  const [isSubmiting, setIsSubmiting] = useState(false)

  const executeTransaction = useExecuteTransaction()
  const refetechVaultUserData = useVaultUserInfo(vault, {
    autoUpdateInterval: 5000,
  })

  const submit = useCallback(async (formAction: FormAction) => {
    setIsSubmiting(true)

    try {
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
    catch (error) {
      console.error('Error during submit', error)
    }

    setIsSubmiting(false)
  }, [])

  return [submit, isSubmiting] as const
}

interface ButtonTextProps {
  insured: boolean
  status: WalletStatus
  isOnDifferentChain: boolean
  chainName?: string
  formAction: FormAction
}

function ButtonText({ insured, status, isOnDifferentChain, chainName, formAction }: ButtonTextProps) {
  if (!insured)
    return 'Asset Insurance Required'

  if (status === WalletStatus.NOT_CONNECTED)
    return 'Connect wallet'

  if (status === WalletStatus.CONNECTING)
    return 'Connecting wallet...'

  // wallet connected...

  if (isOnDifferentChain)
    return `Switch to ${chainName}`

  if (formAction === FormAction.DEPOSIT)
    return 'Save'

  return 'Withdraw'
}

function FrictionRemover({ children }: PropsWithChildren) {
  return <span className={styles.frictionRemover}>{children}</span>
}
