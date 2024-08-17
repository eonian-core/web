import { useQuery } from '@apollo/client'
import { GetWallet, GetWalletPreview } from '../queries/get-wallet.query'
import type { GetWalletPreviewQuery, GetWalletQuery } from '../gql/graphql'
import { walletLinkingClient } from '@/api/wallet-linker.client'
import { WalletStatus } from '@/providers/wallet/wrappers/types'

export function useCurrentWalletLinkPreview(address: string, chainId: number, status: WalletStatus) {
  const request = useWalletLinkPreview(address, chainId)
  if (request.loading || request.error)
    return request

  const linkedWallet = request.data?.getWalletPreview
  const isLinkForCurrentWallet = linkedWallet?.address === address && chainId === linkedWallet.chainId

  if (isLinkForCurrentWallet && status === WalletStatus.CONNECTED)
    return request

  return {
    ...request,
    data: undefined,
  }
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
