'use client'

import type { PropsWithChildren } from 'react'
import { toast } from 'react-toastify'
import React, { useCallback, useState } from 'react'
import type { ButtonProps } from '@nextui-org/react'
import { Spinner } from '@nextui-org/react'

import { useWalletWrapperContext } from '../../../../providers/wallet/wallet-wrapper-provider'
import type { Chain } from '../../../../providers/wallet/wrappers/types'
import { WalletStatus } from '../../../../providers/wallet/wrappers/types'
import { FormAction } from '../../../../store/slices/vaultActionSlice'
import { useExecuteTransaction, useVaultUserInfo } from '../../hooks'
import { useVaultContext } from '../../hooks/use-vault-context'
import styles from './form-button.module.scss'
import { FormButtonBody } from './form-button-body'
import { useAppSelector } from '@/store/hooks'

interface Props extends Omit<ButtonProps, 'onSubmit'> {
  vaultChain: Chain
  isLoading?: boolean
}

const FormButton: React.FC<Props> = ({ vaultChain, isLoading, disabled, ...restProps }) => {
  const { status, connect, chain, setCurrentChain } = useWalletWrapperContext()

  const { formAction, insured, setInsured } = useVaultContext()
  const { submit, walletAvailable, haveInputValue, haveEnoughAssets, canSubmit, isSubmiting } = useSubmit()

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

  const shouldBeAblToSubmit = status === WalletStatus.CONNECTED
  return (
    <FormButtonBody
      onPress={handlePress}
      disabled={
        (disabled || isLoading || isSubmiting)
        || (shouldBeAblToSubmit ? !canSubmit : false)
      }
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
          walletAvailable,
          haveInputValue,
          haveEnoughAssets,
        }} />}
    </FormButtonBody>
  )
}

export default FormButton

function useSubmit() {
  const { onValueChange, inputValue = 0n, vault } = useVaultContext()
  const haveInputValue = inputValue > 0n

  const [isSubmiting, setIsSubmiting] = useState(false)

  const executeTransaction = useExecuteTransaction()
  const refetechVaultUserData = useVaultUserInfo(vault, {
    autoUpdateInterval: 5000,
  })
  const walletAvailable = !!refetechVaultUserData

  const { formAction } = useVaultContext()
  const { walletBalanceBN, vaultBalanceBN } = useAppSelector(state => state.vaultUser)
  const haveEnoughAssets = formAction === FormAction.DEPOSIT ? inputValue <= BigInt(walletBalanceBN) : inputValue <= BigInt(vaultBalanceBN)

  const canSubmit = walletAvailable && haveInputValue && haveEnoughAssets

  const submit = useCallback(async (formAction: FormAction) => {
    if (!canSubmit) {
      toast('Looks like something wrong, try refresh the page', {
        type: 'error',
      })
      return
    }
    setIsSubmiting(true)

    try {
      // Refresh vault <-> user data before the transaction to make sure all calculations are correct.
      await refetechVaultUserData()

      // Execute Deposit/Withdraw transaction
      const success = await executeTransaction(formAction, vault, inputValue)
      if (success) {
        // Refresh wallet balance & vault deposit after the transaction executed.
        void refetechVaultUserData()

        // Reset form input
        onValueChange(0n)
      }
    }
    catch (error) {
      console.error('Error during submit', error)
      toast('An error occurred, please try refresh the page', {
        type: 'error',
      })
    }

    setIsSubmiting(false)
  }, [refetechVaultUserData, onValueChange, inputValue, vault, setIsSubmiting, canSubmit])

  return {
    submit,
    walletAvailable,
    haveInputValue,
    haveEnoughAssets,
    canSubmit,
    isSubmiting,
  }
}

interface ButtonTextProps {
  insured: boolean
  status: WalletStatus
  isOnDifferentChain: boolean
  chainName?: string
  formAction: FormAction
  walletAvailable?: boolean
  haveInputValue?: boolean
  haveEnoughAssets?: boolean
}

function ButtonText({ insured, status, isOnDifferentChain, chainName, formAction, walletAvailable, haveInputValue, haveEnoughAssets }: ButtonTextProps) {
  if (!insured)
    return 'Asset Insurance Required'

  if (status === WalletStatus.NOT_CONNECTED)
    return 'Connect wallet'

  if (status === WalletStatus.CONNECTING)
    return 'Connecting wallet...'

  // wallet connected...

  if (isOnDifferentChain)
    return `Switch to ${chainName}`

  if (!walletAvailable)
    return 'Failed to connect wallet'

  if (!haveInputValue)
    return formAction === FormAction.DEPOSIT ? 'Enter amount to save' : 'Enter amount to withdraw'

  if (!haveEnoughAssets)
    return formAction === FormAction.DEPOSIT ? 'Insufficient wallet balance' : 'Insufficient account balance'

  if (formAction === FormAction.DEPOSIT)
    return 'Save'

  return 'Withdraw'
}

function FrictionRemover({ children }: PropsWithChildren) {
  return <span className={styles.frictionRemover}>{children}</span>
}
