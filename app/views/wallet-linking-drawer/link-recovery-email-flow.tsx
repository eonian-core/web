import { useCallback } from 'react'
import type { FormInputs } from './link-recovery-email-form'
import { LinkRecoveryEmailForm } from './link-recovery-email-form'
import { useDelay, useProcessing } from './use-is-processing'
import type { LinkEmailToWalletInput } from '@/api/wallet-linking/gql/graphql'
import { MutationAction } from '@/api/wallet-linking/gql/graphql'
import { useLinkEmailToWallet } from '@/api/wallet-linking/wallet/use-link-email-to-wallet'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'

const ONE_SECOND = 1000

export interface LinkRecoveryEmailFlowProps {
  close: () => void
}

export function LinkRecoveryEmailFlow({ close }: LinkRecoveryEmailFlowProps) {
  const { wallet, chain, signMessage } = useWalletWrapperContext()
  const address = wallet?.address
  const chainId = chain?.id
  const isWalletConnected = !!(address && chainId)

  const [linkEmail, { data, loading, error }] = useLinkEmailToWallet()

  const [signLinkingMessage, signing] = useProcessing(async (input: Omit<LinkEmailToWalletInput, 'signature'>): Promise<string | null> => {
    const message = buildSignMessage(input)
    return await signMessage(message)
  }, [signMessage])

  const onSubmit = useSubmit({
    linkEmail,
    signLinkingMessage,
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
          signing,
          success,
        }} />
  )
}

export interface SubmitOptions {
  linkEmail: ReturnType<typeof useLinkEmailToWallet>[0]
  signLinkingMessage: (input: Omit<LinkEmailToWalletInput, 'signature'>) => Promise<string | null | undefined>
  isWalletConnected: boolean
  address?: string
  chainId?: ChainId
}

function useSubmit({
  isWalletConnected,
  address,
  chainId,
  signLinkingMessage,
  linkEmail,
}: SubmitOptions) {
  return useCallback(async ({ email }: FormInputs) => {
    if (!isWalletConnected || !address || !chainId) {
      console.warn('Wallet is not connected')
      return
    }

    const input: Omit<LinkEmailToWalletInput, 'signature'> = {
      action: MutationAction.Link,
      payload: {
        address,
        chainId,
        link: { email },
      },
      timestamp: new Date().toISOString(),
    }
    // eslint-disable-next-line no-console
    console.log('onSubmit', email, input)

    const signature = await signLinkingMessage(input)

    await linkEmail({
      variables: {
        input: {
          ...input,
          signature,
        },
      },
    })
  }, [linkEmail, isWalletConnected, address, chainId, signLinkingMessage])
}

function buildSignMessage({ payload, timestamp, action }: Omit<LinkEmailToWalletInput, 'signature'>) {
  const { email } = payload.link

  const firstLine = action === MutationAction.Link
    ? `Certify Eonian that ${email} email should be linked to current wallet.`
    : `Certify Eonian that ${email} email should be unlinked from current wallet.`

  return `${firstLine}
Detailed info:
    - Wallet: ${payload.address}
    - Chain id: ${payload.chainId} 
    - Action: ${action} 
    - Time: ${timestamp}
  `
}
