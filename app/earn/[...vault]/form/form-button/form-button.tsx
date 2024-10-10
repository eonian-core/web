'use client'

import type { PropsWithChildren } from 'react'
import { toast } from 'react-toastify'
import React, { useCallback, useState } from 'react'
import { Spinner } from '@nextui-org/react'

import { useWalletWrapperContext } from '../../../../providers/wallet/wallet-wrapper-provider'
import type { Chain } from '../../../../providers/wallet/wrappers/types'
import { WalletStatus } from '../../../../providers/wallet/wrappers/types'
import { FormAction } from '../../../../store/slices/vaultActionSlice'
import { useExecuteTransaction, useVaultUserInfo } from '../../hooks'
import { useVaultContext } from '../../hooks/use-vault-context'
import styles from './form-button.module.scss'
import { FormButtonBody } from './form-button-body'
import { useButtonText } from './use-button-text'
import { useAppSelector } from '@/store/hooks'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'
import type { ButtonProps } from '@/components/button/button'
import { clarityAdapter } from '@/analytics/clarity-adapter'

interface Props extends Omit<ButtonProps, 'onSubmit'> {
  vaultChain: Chain
  isLoading?: boolean
}

const FormButton: React.FC<Props> = ({ vaultChain, isLoading, disabled, ...restProps }) => {
  const { status, chain } = useWalletWrapperContext()

  const { formAction, insured } = useVaultContext()
  const { submit, walletAvailable, haveInputValue, haveEnoughAssets, canSubmit, isSubmiting } = useSubmit()

  const isOnDifferentChain = vaultChain.id !== chain?.id
  const handlePress = useHandlePress(vaultChain.id, isOnDifferentChain, submit)

  const shouldBeAbleToSubmit = status === WalletStatus.CONNECTED
  const isInProgress = isLoading || isSubmiting
  const isDisabled = disabled || isInProgress || (shouldBeAbleToSubmit ? !canSubmit : false)

  const text = useButtonText({
    insured,
    status,
    isOnDifferentChain,
    chainName: vaultChain.name,
    formAction,
    walletAvailable,
    haveInputValue,
    haveEnoughAssets,
  })
  return (
    <FormButtonBody onClick={isDisabled ? undefined : handlePress} disabled={isDisabled} {...restProps}>
      {isInProgress
        ? <Spinner color="current" size="md" />
        : text
      }
    </FormButtonBody>
  )
}

export default FormButton

function useHandlePress(
  vaultChainId: ChainId,
  isOnDifferentChain: boolean,
  submit: (formAction: FormAction) => Promise<void>,
) {
  const { status, connect, setCurrentChain } = useWalletWrapperContext()
  const { formAction, insured, setInsured } = useVaultContext()

  return useCallback(() => {
    if (!insured)
      return setInsured(true)

    if (status === WalletStatus.NOT_CONNECTED) {
      void connect()
      return
    }

    if (isOnDifferentChain) {
      void setCurrentChain(vaultChainId)
      return
    }

    void submit(formAction)
  }, [insured, setInsured, status, isOnDifferentChain, formAction, connect, setCurrentChain, submit, vaultChainId])
}

export function useSubmit() {
  const { onValueChange, inputValue = 0n, vault } = useVaultContext()
  const haveInputValue = inputValue > 0n

  const [isSubmiting, setIsSubmiting] = useState(false)

  const executeTransaction = useExecuteTransaction()
  const refetechVaultUserData = useVaultUserInfo(vault, {
    autoUpdateInterval: 5000,
  })
  const walletAvailable = !!refetechVaultUserData

  const haveEnoughAssets = useHaveEnoughAssets()
  const canSubmit = walletAvailable && haveInputValue && haveEnoughAssets

  return {
    walletAvailable,
    haveInputValue,
    haveEnoughAssets,
    canSubmit,
    isSubmiting,
    submit: useCallback(
      async (formAction: FormAction) => {
        clarityAdapter.trackEvent(`start execute ${formAction}`)
        if (!canSubmit) {
          toast('Looks like something is wrong, try refreshing the page', {
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
          clarityAdapter.trackEvent(`execute ${formAction} result: ${success}`)
          if (success) {
            // Refresh wallet balance & vault deposit after the transaction executed.
            void refetechVaultUserData()

            // Reset form input
            onValueChange(0n)
          }
        }
        catch (error) {
          console.error('Error during submit', error)
          toast('An error occurred, please try refreshing the page', {
            type: 'error',
          })
        }

        setIsSubmiting(false)
      },
      [refetechVaultUserData, onValueChange, inputValue, vault, setIsSubmiting, canSubmit],
    ),
  }
}

export function useHaveEnoughAssets() {
  const { inputValue = 0n, formAction } = useVaultContext()
  const { walletBalanceBN, vaultBalanceBN } = useAppSelector(state => state.vaultUser)

  return formAction === FormAction.DEPOSIT
    ? inputValue <= BigInt(walletBalanceBN)
    : inputValue <= BigInt(vaultBalanceBN)
}

// TODO: find proper way to integrate
export function FrictionRemover({ children }: PropsWithChildren) {
  return <span className={styles.frictionRemover}>{children}</span>
}
