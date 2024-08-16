import { getWallet, getWalletPreview } from '../queries/get-wallet.query'
import type { WalletPreview } from '../gql/graphql'
import { getWalletLinkingRscClient } from '@/api/apollo.rsc-client'

export async function fetchWalletLinkPreview(address: string): Promise<WalletPreview | null | undefined> {
  try {
    const client = getWalletLinkingRscClient()
    const data = await getWalletPreview(client, address)
    return data.getWalletPreview
  }
  catch (e) {
    console.warn('Failed to fetch wallet preview for address:', address, '\nError:', e)
  }
}

export async function fetchWalletLink(address: string) {
  try {
    const client = getWalletLinkingRscClient()
    const data = await getWallet(client, address)
    return data.getWallet
  }
  catch (e) {
    console.warn('Failed to fetch wallet link for address:', address, '\nError:', e)
  }
}
