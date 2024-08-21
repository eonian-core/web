import type { ApolloClient } from '@apollo/client'
import { gql } from '@apollo/client'
import type { LinkEmailToWalletInput, LinkEmailToWalletMutation } from '../gql/graphql'

export const LinkEmailToWallet = gql`
    mutation LinkEmailToWallet($input: LinkEmailToWalletInput!) {
        linkEmailToWallet(input: $input) {
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
            preview {
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
    }
`

/**
 * Link email to wallet
 */
export async function linkEmailToWallet(client: ApolloClient<any>, input: LinkEmailToWalletInput) {
  const { data, errors } = await client.mutate<LinkEmailToWalletMutation>({
    mutation: LinkEmailToWallet,
    variables: {
      input,
    },
  })
  if (errors)
    throw errors?.[0] ?? new Error('Unknown error during linkEmailToWallet mutation')

  return data
}
