'use client'

import React from 'react'

import { Card, CardBody } from '@heroui/react'
import { useAppSelector } from '../../../store/hooks'
import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import type { Chain } from '../../../providers/wallet/wrappers/types'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { FormActionStep } from '../../../store/slices/vaultActionSlice'
import { getActiveStepSelector } from '../../../store'
import { useVaultContext } from '../hooks/use-vault-context'
import FormButton from './form-button/form-button'
import FormHeader from './form-header/form-header'
import styles from './form.module.scss'
import FormInput from './form-input/form-input'
import { FormPreview } from './form-preview'
import { BlocknativeLink } from './blocknative-link/blocknative-link'
import { ArrowDivider } from './arrow-divider/arrow-divider'
import { RequestStatus } from '@/store/slices/requestSlice'

const Form: React.FC = () => {
  const vaultChain = useVaultChain()

  const hasPendingTransactions = useHasPendingTransactions()
  const isFormReady = useFormReady()

  const disabled = hasPendingTransactions || !isFormReady
  return (
    <div className={styles.container}>
      <Card>
        <FormHeader />

        <CardBody className={styles.fragment}>
          <FormInput {...{ disabled }} />

          <ArrowDivider />

          <FormPreview {...{ disabled }} />

          <FormButton vaultChain={vaultChain} disabled={!isFormReady} isLoading={hasPendingTransactions} />
        </CardBody>
      </Card>

      <div className={styles.links}>
        <BlocknativeLink />
      </div>
    </div>
  )
}

function useHasPendingTransactions() {
  const activeStep = useAppSelector(getActiveStepSelector)
  return activeStep !== null && activeStep !== FormActionStep.DONE
}

function useVaultChain(): Chain | undefined {
  const { chains } = useWalletWrapperContext()
  const { chainId } = useVaultContext()
  return React.useMemo(() => chains.find(chain => chain.id === chainId)!, [chains, chainId])
}

function useFormReady() {
  const { wallet, status } = useWalletWrapperContext()
  const { status: loadingStatus, lastRequestForWallet } = useAppSelector(state => state.vaultUser)
  const isLoading = loadingStatus === RequestStatus.Pending

  const isFirstRequestFinished = lastRequestForWallet === wallet?.address

  const isWalletNotConnected = status === WalletStatus.NOT_CONNECTED

  const isFormReady = !isLoading || isFirstRequestFinished || isWalletNotConnected
  return isFormReady
}

export default Form
