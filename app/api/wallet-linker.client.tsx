import { ApolloClient, InMemoryCache } from '@apollo/client'
import { makeWalletLinkingEndpoint } from './apollo.endpoints'

export const walletLinkingClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: makeWalletLinkingEndpoint(),
})
