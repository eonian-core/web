import type { ApolloClient } from '@apollo/client'
import { gql } from '@apollo/client'
import type { LinkEmailToWalletMutation } from '../gql/graphql'

export const LinkEmailToWallet = gql`
    mutation LinkEmailToWallet($email: String!) {
        linkEmailToWallet(email: $email) {
            id
            address
            chainId
            preview {
                id
                address
                chainId
                emailLink {
                    id
                    email
                }
            }
        }
    }
`

/**
 * Link email to wallet
 */
export async function linkEmailToWallet(client: ApolloClient<any>, email: string) {
  const { data, errors } = await client.mutate<LinkEmailToWalletMutation>({
    mutation: LinkEmailToWallet,
    variables: {
      email,
    },
  })
  if (errors)
    throw errors?.[0] ?? new Error('Unknown error during linkEmailToWallet mutation')

  return data
}
