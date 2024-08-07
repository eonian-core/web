'use client'

import React from 'react'

import { Card, CardBody } from '@nextui-org/react'
import { useAppSelector } from '../../../store/hooks'
import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { FormActionStep } from '../../../store/slices/vaultActionSlice'
import { getActiveStepSelector } from '../../../store'
import type { ChainId } from '../../../providers/wallet/wrappers/helpers'
import FormButton from './form-button/form-button'
import FormHeader from './form-header/form-header'
import styles from './form.module.scss'
import FormInput from './form-input/form-input'
import { FormPreview } from './form-preview'
import { BlocknativeLink } from './blocknative-link/blocknative-link'
import { ArrowDivider } from './arrow-divider/arrow-divider'

interface Props {
  chainId: ChainId
}

const Form: React.FC<Props> = ({ chainId }) => {
  const vaultChain = useVaultChain(chainId)

  const hasPendingTransactions = useHasPendingTransactions()
  const isFormReady = useFormReady()

  const disabled = hasPendingTransactions || !isFormReady
  return (
    <div className={styles.container}>
      <Card>
        <FormHeader />

        <CardBody className={styles.fragment}>
          <FormInput {...{ disabled }}/>

          <ArrowDivider />

          <FormPreview {...{ disabled }}/>

          <FormButton vaultChain={vaultChain} disabled={!isFormReady} isLoading={hasPendingTransactions} />
        </CardBody>
      </Card>
      <BlocknativeLink />
    </div>
  )
}

function useHasPendingTransactions() {
  const activeStep = useAppSelector(getActiveStepSelector)
  return activeStep !== null && activeStep !== FormActionStep.DONE
}

function useVaultChain(chainId: ChainId) {
  const { chains } = useWalletWrapperContext()
  return React.useMemo(() => chains.find(chain => chain.id === chainId)!, [chains, chainId])
}

function useFormReady() {
  const { wallet, status } = useWalletWrapperContext()
  const { isLoading, lastRequestForWallet } = useAppSelector(state => state.vaultUser)

  const isFirstRequestFinished = lastRequestForWallet === wallet?.address

  const isWalletNotConnected = status === WalletStatus.NOT_CONNECTED

  const isFormReady = !isLoading || isFirstRequestFinished || isWalletNotConnected
  return isFormReady
}

export default Form
