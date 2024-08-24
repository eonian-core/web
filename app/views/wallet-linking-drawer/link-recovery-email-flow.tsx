import { useCallback } from 'react'
import type { FormInputs } from './link-recovery-email-form'
import { LinkRecoveryEmailForm } from './link-recovery-email-form'
import { useDelay } from './use-is-processing'
import { useLinkEmailToWallet } from '@/api/wallet-linking/wallet/use-link-email-to-wallet'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'

const ONE_SECOND = 1000

export interface LinkRecoveryEmailFlowProps {
  close: () => void
}

export function LinkRecoveryEmailFlow({ close }: LinkRecoveryEmailFlowProps) {
  const { wallet, chain, loggingIn, loginThroughSign } = useWalletWrapperContext()
  const address = wallet?.address
  const chainId = chain?.id
  const isWalletConnected = !!(address && chainId)

  const [linkEmail, { data, loading, error }] = useLinkEmailToWallet()

  const onSubmit = useSubmit({
    linkEmail,
    loginThroughSign,
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
  linkEmail: ReturnType<typeof useLinkEmailToWallet>[0]
  loginThroughSign: () => Promise<string>
  isWalletConnected: boolean
  address?: string
  chainId?: ChainId
}

function useSubmit({
  isWalletConnected,
  address,
  chainId,
  loginThroughSign,
  linkEmail,
}: SubmitOptions) {
  return useCallback(async ({ email }: FormInputs) => {
    if (!isWalletConnected || !address || !chainId) {
      console.warn('Wallet is not connected')
      return
    }

    const signatureToken = await loginThroughSign()

    await linkEmail({
      variables: {
        input: {
          address,
          chainId,
          link: { email },
        },
      },
      context: {
        headers: {
          'x-signature': signatureToken,
        },
      },
    })
  }, [linkEmail, isWalletConnected, address, chainId, loginThroughSign])
}
