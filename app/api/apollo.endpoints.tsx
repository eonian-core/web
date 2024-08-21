import { HttpLink } from '@apollo/client'
import type { ChainId } from '../providers/wallet/wrappers/helpers'
import { GraphQLEndpoints } from './endpoints'
import { requireEnv } from './environment'

export function makeProtocolEndpoint(chainId: ChainId) {
  const uri = GraphQLEndpoints[chainId]
  if (!uri)
    throw new Error(`Unknown chain id: ${chainId}`)

  return new HttpLink({
    uri,
  })
}

export function makeWalletLinkingEndpoint() {
  return new HttpLink({
    uri: requireEnv('NEXT_PUBLIC_WALLET_LINKING_GRAPH_URL', process.env.NEXT_PUBLIC_WALLET_LINKING_GRAPH_URL),
  })
}
