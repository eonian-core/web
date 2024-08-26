import { useMutation } from '@apollo/client'
import { LinkEmailToWallet } from '../mutations/link-wallet.mutation'
import type { LinkEmailToWalletMutation } from '../gql/graphql'
import { GetWalletPreview } from '../queries/get-wallet.query'
import { walletLinkingClient } from '@/api/wallet-linker.client'

export function useLinkEmailToWallet() {
  return useMutation<LinkEmailToWalletMutation>(LinkEmailToWallet, {
    client: walletLinkingClient,
    refetchQueries: [
      GetWalletPreview,
      'GetWalletPreview',
    ],
  })
}
