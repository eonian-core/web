import { HttpLink } from '@apollo/client'
import { GraphQLEndpoints } from './endpoints'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'
import { requireEnv } from '@/utils/env'

export function makeProtocolEndpoint(chainId: ChainId) {
  const uri = GraphQLEndpoints[chainId]
  if (!uri)
    throw new Error(`Unknown chain id: ${chainId}`)

  return new HttpLink({
    uri,
  })
}

export const walletLinkingEndpoint = requireEnv('NEXT_PUBLIC_WALLET_LINKING_URL', process.env.NEXT_PUBLIC_WALLET_LINKING_URL)

export function makeWalletLinkingEndpoint() {
  const uri = new URL('/graphql', walletLinkingEndpoint)
  return new HttpLink({
    uri: uri.toString(),
  })
}
