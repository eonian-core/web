import { useMutation } from '@apollo/client'
import { LinkEmailToWallet } from '../mutations/link-wallet.mutation'
import type { LinkEmailToWalletMutation } from '../gql/graphql'
import { walletLinkingClient } from '@/api/wallet-linker.client'

export function useLinkEmailToWallet() {
  return useMutation<LinkEmailToWalletMutation>(LinkEmailToWallet, {
    client: walletLinkingClient,
  })
}
