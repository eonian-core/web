import { HttpLink } from '@apollo/client'
import type { ChainId } from '../providers/wallet/wrappers/helpers'
import { GraphQLEndpoints } from './endpoints'

export function makeHttpLink(chainId: ChainId) {
  const uri = GraphQLEndpoints[chainId]
  if (!uri)
    throw new Error(`Unknown chain id: ${chainId}`)

  return new HttpLink({
    uri,
  })
}
