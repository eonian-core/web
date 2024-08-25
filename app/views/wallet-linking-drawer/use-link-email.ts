import { useCallback } from 'react'
import { useLinkEmailToWallet } from '@/api/wallet-linking/wallet/use-link-email-to-wallet'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'

export interface LinkEmailOptions {
  address: string
  chainId: number
  email: string
}

export function useLinkEmail() {
  const { loginThroughSign } = useWalletWrapperContext()
  const [linkEmail, state] = useLinkEmailToWallet()

  const signAndLink = useCallback(async ({ address, chainId, email }: LinkEmailOptions) => {
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
  }, [loginThroughSign, linkEmail])

  return [signAndLink, state] as const
}
