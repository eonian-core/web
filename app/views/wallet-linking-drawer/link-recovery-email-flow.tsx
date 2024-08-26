import { useCallback } from 'react'
import type { FormInputs } from './link-recovery-email-form'
import { LinkRecoveryEmailForm } from './link-recovery-email-form'
import { useDelay } from './use-is-processing'
import { useLinkEmail } from './use-link-email'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'

const ONE_SECOND = 1000

export interface LinkRecoveryEmailFlowProps {
  close: () => void
}

export function LinkRecoveryEmailFlow({ close }: LinkRecoveryEmailFlowProps) {
  const { wallet, chain, loggingIn } = useWalletWrapperContext()
  const address = wallet?.address
  const chainId = chain?.id
  const isWalletConnected = !!(address && chainId)

  const [signAndLink, { data, loading, error }] = useLinkEmail()

  const onSubmit = useSubmit({
    signAndLink,
    isWalletConnected,
    address,
    chainId,
  })

  const success = !!(data && !error)

  useDelay(2 * ONE_SECOND, () => {
    if (!success)
      return

    return close
  }, [success, close])

  return (
    <LinkRecoveryEmailForm {...{
      onSubmit,
      loading,
      error,
      isWalletConnected,
      address,
      success,
      loggingIn,
    }} />
  )
}

export interface SubmitOptions {
  signAndLink: ReturnType<typeof useLinkEmail>[0]
  isWalletConnected: boolean
  address?: string
  chainId?: ChainId
}

function useSubmit({
  isWalletConnected,
  address,
  chainId,
  signAndLink,
}: SubmitOptions) {
  return useCallback(async ({ email }: FormInputs) => {
    if (!isWalletConnected || !address || !chainId) {
      console.warn('Wallet is not connected')
      return
    }

    await signAndLink({ address, chainId, email })
  }, [signAndLink, isWalletConnected, address, chainId])
}
