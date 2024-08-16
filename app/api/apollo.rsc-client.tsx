import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ChainId } from '../providers/wallet/wrappers/helpers'
import { makeHttpLink } from './apollo.clients'
import { scalarTypePolicies } from './protocol/gql/graphql'

function makeClientFactory(chainId: ChainId): () => ApolloClient<any> {
  return () => {
    return new ApolloClient({
      cache: new InMemoryCache({ typePolicies: scalarTypePolicies }),
      link: makeHttpLink(chainId),
    })
  }
}

function registerClient(chainId: ChainId) {
  const clientMaker = makeClientFactory(chainId)
  return registerApolloClient(clientMaker).getClient
}

const rscClientGetters: Record<Exclude<ChainId, ChainId.UNKNOWN>, ReturnType<typeof registerApolloClient>['getClient']> = {
  [ChainId.BSC_MAINNET]: registerClient(ChainId.BSC_MAINNET),
  [ChainId.SEPOLIA]: registerClient(ChainId.SEPOLIA),
}

export function getRscClient(chainId: ChainId) {
  if (chainId === ChainId.UNKNOWN)
    throw new Error('Unknown chain id')

  return rscClientGetters[chainId]()
}
