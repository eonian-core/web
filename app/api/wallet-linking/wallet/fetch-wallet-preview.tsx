import { getWallet, getWalletPreview } from '../queries/get-wallet.query'
import type { WalletPreview } from '../gql/graphql'
import { walletLinkingClient } from '@/api/wallet-linker.client'

export async function fetchWalletLinkPreview(address: string, chainId: number): Promise<WalletPreview | null | undefined> {
  try {
    const data = await getWalletPreview(walletLinkingClient, address, chainId)
    return data.getWalletPreview
  }
  catch (e) {
    console.warn('Failed to fetch wallet preview for address:', address, '\nError:', e)
  }
}

export async function fetchWalletLink(address: string, chainId: number) {
  try {
    const data = await getWallet(walletLinkingClient, address, chainId)
    return data.getWallet
  }
  catch (e) {
    console.warn('Failed to fetch wallet link for address:', address, '\nError:', e)
  }
}
