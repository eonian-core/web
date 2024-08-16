import type { ApolloClient } from '@apollo/client'
import { gql } from '@apollo/client'
import type { GetWalletPreviewQuery, GetWalletQuery } from '../gql/graphql'

export const GetWalletPreview = gql`
  query GetWalletPreview($address: String!) {
    getWalletPreview(address: $address) {
      address
      link {
        ... on EmailLinkPreview {
          email
        }
        ... on SocialLinkPreview {
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
export async function getWalletPreview(client: ApolloClient<any>, address: string) {
  const { data, error } = await client.query<GetWalletPreviewQuery>({
    query: GetWalletPreview,
    variables: {
      address,
    },
  })
  return { data, error }
}

export const GetWallet = gql`
  query GetWallet($address: String!) {
    getWallet(address: $address) {
      address
      links {
        payload {
          ... on EmailLink {
            email
          }
          ... on SocialLink {
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
export async function getWallet(client: ApolloClient<any>, address: string) {
  const { data, error } = await client.query<GetWalletQuery>({
    query: GetWallet,
    variables: {
      address,
    },
  })
  return { data, error }
}
