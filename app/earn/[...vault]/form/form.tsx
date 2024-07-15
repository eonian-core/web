'use client'

import React from 'react'

import { Card, CardBody, Divider } from '@nextui-org/react'
import clsx from 'clsx'
import type { Vault } from '../../../api'
import { useAppSelector } from '../../../store/hooks'
import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { VaultLink } from '../components'
import { useExecuteTransaction, useVaultUserInfo } from '../hooks'
import { FormAction, FormActionStep } from '../../../store/slices/vaultActionSlice'
import { getActiveStepSelector } from '../../../store'
import type { ChainId } from '../../../providers/wallet/wrappers/helpers'
import { useVaultInputContext } from '../hooks/use-vault-input-context'
import FormButton from './form-button'
import FormHeader from './form-header'
import styles from './form.module.scss'
import FormInput from './form-input'
import { FormPreview } from './form-preview'
import IconArrowRightShort from '@/components/icons/icon-arrow-right-short'
import { getAssetSymbol } from '@/earn/components/vault-card/vault-card-features'

interface Props {
  vault: Vault
  chainId: ChainId
}

const Form: React.FC<Props> = ({ vault, chainId }) => {
  const { wallet, status } = useWalletWrapperContext()

  const refetechVaultUserData = useVaultUserInfo(vault, {
    autoUpdateInterval: 5000,
  })

  const { isLoading, lastRequestForWallet } = useAppSelector(state => state.vaultUser)

  const {
    inputValue: value,
    displayValue,
    onValueChange: handleValueChange,
    formAction,
    setFormAction,
  } = useVaultInputContext()

  const balances = useBalance()
  const formBalance = formAction === FormAction.DEPOSIT ? balances.inWallet : balances.inVault

  const vaultChain = useVaultChain(chainId)
  const hasPendingTransactions = useHasPendingTransactions()
  const executeTransaction = useExecuteTransaction()

  const handleSubmit = React.useCallback(
    async (formAction: FormAction) => {
      // Refresh vault <-> user data before the transaction to make sure all calculations are correct.
      await refetechVaultUserData!()

      // Execute Deposit/Withdraw transaction
      const success = await executeTransaction(formAction, vault, value)
      if (success) {
        // Refresh wallet balance & vault deposit after the transaction executed.
        void refetechVaultUserData!()

        // Reset form input
        handleValueChange(0n)
      }
    },
    [executeTransaction, refetechVaultUserData, handleValueChange, vault, value],
  )

  const isFirstRequestFinished = lastRequestForWallet === wallet?.address
  const isWalletNotConnected = status === WalletStatus.NOT_CONNECTED
  const isFormReady = !isLoading || isFirstRequestFinished || isWalletNotConnected

  return (
    <div className={styles.container}>
      <Card>
        <FormHeader currentAction={formAction} onCurrentActionChange={setFormAction} />

        <Divider />

        <CardBody className={styles.fragment}>
          <FormInput
            label={formAction === FormAction.DEPOSIT ? 'From Your Wallet' : 'From Your Account'}
            value={displayValue}
            balance={formBalance}
            onChange={handleValueChange}
            isLoading={!isFormReady}
            disabled={hasPendingTransactions}
            vault={vault}
          />

          <ArrowDivider size={24} />

          <FormPreview
            label={formAction === FormAction.DEPOSIT ? 'To Your Account' : 'To Your Wallet'}
            vault={vault}
          />

          <FormButton
            vaultChain={vaultChain}
            disabled={!isFormReady}
            formAction={formAction}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit}
            isLoading={hasPendingTransactions}
          />
        </CardBody>
      </Card>
      <h4>
        <VaultLink vault={vault} chainId={vaultChain.id} />
      </h4>
    </div>
  )
}

function ArrowDivider({ size }: { size: number }) {
  return (
    <div className={styles.arrowDivider}>
      <Divider />
      <div className={clsx(styles.arrow, 'bg-content1')}>
        <IconArrowRightShort width={size} height={size} />
      </div>
    </div>
  )
}

export interface Balance {
  inWallet: bigint
  inVault: bigint
}

function useBalance(): Balance {
  const { walletBalanceBN, vaultBalanceBN } = useAppSelector(state => state.vaultUser)
  const wallet = BigInt(walletBalanceBN)
  const vault = BigInt(vaultBalanceBN)
  return {
    inWallet: wallet,
    inVault: vault,
  }
}

function useHasPendingTransactions() {
  const activeStep = useAppSelector(getActiveStepSelector)
  return activeStep !== null && activeStep !== FormActionStep.DONE
}

function useVaultChain(chainId: ChainId) {
  const { chains } = useWalletWrapperContext()
  return React.useMemo(() => chains.find(chain => chain.id === chainId)!, [chains, chainId])
}

export default Form
