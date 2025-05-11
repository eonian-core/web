import { HttpLink } from '@apollo/client'
import { requireEnv } from '@/utils/env'

export const walletLinkingEndpoint = requireEnv('NEXT_PUBLIC_WALLET_LINKING_URL', process.env.NEXT_PUBLIC_WALLET_LINKING_URL)

export function makeWalletLinkingEndpoint() {
  const uri = new URL('/graphql', walletLinkingEndpoint)
  return new HttpLink({
    uri: uri.toString(),
  })
}
