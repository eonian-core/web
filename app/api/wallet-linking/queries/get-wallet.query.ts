import type { ApolloClient } from '@apollo/client'
import { gql } from '@apollo/client'
import type { GetWalletPreviewQuery, GetWalletQuery } from '../gql/graphql'

export const GetWalletPreview = gql`
  query GetWalletPreview($address: String!, $chainId: Int!) {
    getWalletPreview(address: $address, chainId: $chainId) {
      id
      address
      chainId
      link {
        ... on EmailLinkPreview {
          id
          email
        }
        ... on SocialLinkPreview {
          id
          platform
          username
        }
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
  query GetWallet($address: String!, $chainId: Int!) {
    getWallet(address: $address, chainId: $chainId) {
      id
      address
      chainId
      links {
        id
        payload {
          ... on EmailLink {
            id
            email
          }
          ... on SocialLink {
            id
            platform
            username
          }
        }
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
