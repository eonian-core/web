'use client'

import type { PropsWithChildren } from 'react'
import { toast } from 'react-toastify'
import React, { useCallback, useState } from 'react'
import { Spinner } from '@heroui/react'

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
import { ChainId, getChainNativeTokenTutorialLink } from '@/providers/wallet/wrappers/helpers'
import type { ButtonProps } from '@/components/button/button'
import { analytics } from '@/analytics/analytics'

interface Props extends Omit<ButtonProps, 'onSubmit'> {
  vaultChain: Chain | undefined
  isLoading?: boolean
}

const FormButton: React.FC<Props> = ({ vaultChain, isLoading, disabled, ...restProps }) => {
  const { status, chain } = useWalletWrapperContext()
  const chainId = chain?.id ?? ChainId.UNKNOWN

  const haveEnoughForGasPayment = useCheckEnoughForGasPayment()

  const { formAction, insured } = useVaultContext()
  const { submit, walletAvailable, haveInputValue, haveEnoughAssets, canSubmit, isSubmiting } = useSubmit()

  const isOnDifferentChain = vaultChain?.id !== chainId
  const handlePress = useHandlePress(vaultChain?.id, isOnDifferentChain, haveEnoughForGasPayment, submit)

  const isWrongChainSelected = chainId === -1 || chainId !== vaultChain?.id
  const isAbleToSubmit = !isWrongChainSelected && status === WalletStatus.CONNECTED
  const isInProgress = isLoading || isSubmiting
  const isDisabled = disabled || isInProgress || (isAbleToSubmit ? !canSubmit : false)

  const text = useButtonText({
    insured,
    chainId,
    status,
    isOnDifferentChain,
    chainName: vaultChain?.name,
    formAction,
    walletAvailable,
    haveInputValue,
    haveEnoughAssets,
    haveEnoughForGasPayment,
  })

  return (
    <FormButtonBody onClick={isDisabled ? undefined : handlePress} disabled={isDisabled} className={styles.button} {...restProps}>
      {isInProgress
        ? <Spinner color="current" size="md" />
        : text
      }
    </FormButtonBody>
  )
}

export default FormButton

function useHandlePress(
  vaultChainId: ChainId | undefined,
  isOnDifferentChain: boolean,
  haveEnoughForGasPayment: boolean,
  submit: (formAction: FormAction) => Promise<void>,
) {
  const { status, connect, setCurrentChain } = useWalletWrapperContext()
  const { formAction, insured, setInsured } = useVaultContext()

  return useCallback(() => {
    if (!haveEnoughForGasPayment)
      return window.open(getChainNativeTokenTutorialLink(vaultChainId), '_blank')

    if (!insured)
      return setInsured(true)

    if (status === WalletStatus.NOT_CONNECTED) {
      void connect()
      return
    }

    if (isOnDifferentChain) {
      if (vaultChainId === undefined)
        return

      void setCurrentChain(vaultChainId)
      return
    }

    void submit(formAction)
  }, [haveEnoughForGasPayment, insured, setInsured, status, isOnDifferentChain, submit, formAction, connect, setCurrentChain, vaultChainId])
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
        analytics.track(`start execute ${formAction}`)
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
          analytics.track(`executed ${formAction}`, { result: success })
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
      [canSubmit, refetechVaultUserData, executeTransaction, vault, inputValue, onValueChange],
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

function useCheckEnoughForGasPayment(): boolean {
  const { depositGasPriceBN, withdrawGasPriceBN, nativeWalletBalanceBN } = useAppSelector(state => state.vaultUser)
  const { formAction } = useVaultContext()
  const gasPrice = formAction === FormAction.DEPOSIT ? depositGasPriceBN : withdrawGasPriceBN
  return BigInt(nativeWalletBalanceBN) >= BigInt(gasPrice)
}
