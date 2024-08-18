import { useQuery, useSuspenseQuery } from '@apollo/client'
import { GetWallet, GetWalletPreview } from '../queries/get-wallet.query'
import type { EmailLinkPreview, GetWalletPreviewQuery, GetWalletQuery } from '../gql/graphql'
import { walletLinkingClient } from '@/api/wallet-linker.client'
import { WalletStatus } from '@/providers/wallet/wrappers/types'

export const isEmailLinked = (link: any): link is EmailLinkPreview => 'email' in link

export function useSuspenseCurrentWalletLinkPreview(address: string, chainId: number, status: WalletStatus) {
  const request = useSuspenseWalletLinkPreview(address, chainId)

  const linkedWallet = request.data?.getWalletPreview
  const isLinkForCurrentWallet = linkedWallet?.address === address && chainId === linkedWallet.chainId

  if (isLinkForCurrentWallet && status === WalletStatus.CONNECTED)
    return request

  return {
    ...request,
    data: undefined, // clear data so it cannot confuse user when wallet is changed
  }
}

export function useSuspenseWalletLinkPreview(address: string, chainId: number) {
  const request = useSuspenseQuery<GetWalletPreviewQuery>(GetWalletPreview, {
    client: walletLinkingClient,
    variables: {
      address,
      chainId,
    },
  })

  if (request.error)
    throw request.error

  return request
}

export function useWalletLinkPreview(address: string, chainId: number) {
  return useQuery<GetWalletPreviewQuery>(GetWalletPreview, {
    client: walletLinkingClient,
    variables: {
      address,
      chainId,
    },
  })
}

export function useWalletLink(address: string, chainId: number) {
  return useQuery<GetWalletQuery>(GetWallet, {
    client: walletLinkingClient,
    variables: {
      address,
      chainId,
    },
  })
}
