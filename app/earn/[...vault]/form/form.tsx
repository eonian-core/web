'use client'

import React from 'react'

import { Card, CardBody, Divider } from '@nextui-org/react'
import clsx from 'clsx'
import { useAppSelector } from '../../../store/hooks'
import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { FormActionStep } from '../../../store/slices/vaultActionSlice'
import { getActiveStepSelector } from '../../../store'
import type { ChainId } from '../../../providers/wallet/wrappers/helpers'
import FormButton from './form-button'
import FormHeader from './form-header'
import styles from './form.module.scss'
import FormInput from './form-input'
import { FormPreview } from './form-preview'
import IconArrowRightShort from '@/components/icons/icon-arrow-right-short'

interface Props {
  chainId: ChainId
}

const Form: React.FC<Props> = ({ chainId }) => {
  const vaultChain = useVaultChain(chainId)

  const hasPendingTransactions = useHasPendingTransactions()
  const isFormReady = useFormReady()

  return (
    <div className={styles.container}>
      <Card>
        <FormHeader />

        <Divider />

        <CardBody className={styles.fragment}>
          <FormInput disabled={hasPendingTransactions || !isFormReady} />

          <ArrowDivider size={24} />

          <FormPreview />

          <FormButton vaultChain={vaultChain} disabled={!isFormReady} isLoading={hasPendingTransactions} />
        </CardBody>
      </Card>
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
