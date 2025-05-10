import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ChainId } from '../providers/wallet/wrappers/helpers'
import { makeProtocolEndpoint } from './apollo.endpoints'
import { scalarTypePolicies } from './protocol/gql/graphql'

function makeProtocolClientFactory(chainId: ChainId): () => ApolloClient<any> {
  return () => {
    return new ApolloClient({
      cache: new InMemoryCache({ typePolicies: scalarTypePolicies }),
      link: makeProtocolEndpoint(chainId),
    })
  }
}

function registerProtocolClient(chainId: ChainId) {
  const clientMaker = makeProtocolClientFactory(chainId)
  return registerApolloClient(clientMaker).getClient
}

const rscProtocolClientGetters: Record<Exclude<ChainId, ChainId.UNKNOWN>, ReturnType<typeof registerApolloClient>['getClient']> = {
  [ChainId.BSC_MAINNET]: registerProtocolClient(ChainId.BSC_MAINNET),
}

export function getProtocolRscClient(chainId: ChainId) {
  if (chainId === ChainId.UNKNOWN)
    throw new Error('Unknown chain id')

  return rscProtocolClientGetters[chainId]()
}
