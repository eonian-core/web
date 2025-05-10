import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr'
import type { PropsWithChildren } from 'react'
import type { ApolloClient } from '@apollo/client'
import { makeProtocolEndpoint } from './apollo.endpoints'
import { scalarTypePolicies } from './protocol/gql/graphql'
import { useChainContext } from '@/shared/web3/chain-context'
import { ChainId } from '@/providers/wallet/wrappers/helpers'

function makeSsrClientFactory(chainId: ChainId): () => ApolloClient<any> {
  return () => {
    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache({ typePolicies: scalarTypePolicies }),
      link: makeProtocolEndpoint(chainId),
    })
  }
}

const ssrClientMakers: Record<ChainId, () => ApolloClient<any>> = {
  [ChainId.BSC_MAINNET]: makeSsrClientFactory(ChainId.BSC_MAINNET),
  [ChainId.SEPOLIA]: makeSsrClientFactory(ChainId.SEPOLIA),
  [ChainId.ZEN_CHAIN_TESTNET]: () => {
    throw new Error('ZenChain is not supported yet')
  },
  [ChainId.UNKNOWN]: () => {
    throw new Error('Unknown chain id')
  },
}

/**
 * Provides Apollo client that can be used in browser and client components
 * Can be used together with useSuspenseQuery.
 * @important do not mix with RSC clients and server components, use only one of them per request type
 */
export function ApolloSsrProvider({ children }: PropsWithChildren) {
  const { chainId } = useChainContext()
  // TODO: can not work when switching chains, need check
  return (
    <ApolloNextAppProvider makeClient={ssrClientMakers[chainId]}>
      {children}
    </ApolloNextAppProvider>
  )
}
