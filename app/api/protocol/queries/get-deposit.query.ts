import type { ApolloClient } from '@apollo/client'
import { gql } from '@apollo/client'

import type { GetDepositsQuery } from '../gql/graphql'

export const GetDeposits = gql`
  query GetDeposits($offset: Int!, $limit: Int!) {
    deposits(first: $limit, skip: $offset, orderBy: blockTimestamp, orderDirection: desc) {
      caller
    }
  }
`

/**
 * Get deposits
 */
export async function getDeposits(client: ApolloClient<any>, offset: number, limit: number) {
  const { data, error } = await client.query<GetDepositsQuery>({
    query: GetDeposits,
    variables: {
      offset,
      limit,
    },
  })
  if (error)
    throw error

  return data
}
