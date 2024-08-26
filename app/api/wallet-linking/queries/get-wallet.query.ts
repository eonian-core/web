import type { ApolloClient } from '@apollo/client'
import { gql } from '@apollo/client'
import type { GetWalletPreviewQuery, GetWalletQuery } from '../gql/graphql'

export const GetWalletPreview = gql`
  query GetWalletPreview($address: String!, $chainId: Int!) {
    walletPreview(address: $address, chainId: $chainId) {
      id
      address
      chainId
      emailLink {
        id
        email
      }
    }
  }
`

/**
 * Get wallet preview
 */
export async function getWalletPreview(client: ApolloClient<any>, address: string, chainId: number) {
  const { data, error } = await client.query<GetWalletPreviewQuery>({
    query: GetWalletPreview,
    variables: {
      address,
      chainId,
    },
  })
  if (error)
    throw error

  return data
}

export const GetWallet = gql`
  query GetWallet {
    wallet {
      id
      address
      chainId
      emailLinks {
        id
        email
      }
      socialLinks {
        id
        platform
        username
      }
    }
  }
`

/**
 * Get wallet with linked emails and social links
 */
export async function getWallet(client: ApolloClient<any>, address: string, chainId: number) {
  const { data, error } = await client.query<GetWalletQuery>({
    query: GetWallet,
    variables: {
      address,
      chainId,
    },
  })
  if (error)
    throw error

  return data
}
