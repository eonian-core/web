import type { ApolloClient } from '@apollo/client'
import { gql } from '@apollo/client'

import type { GetVaultsQuery, GetVaultsSymbolsQuery } from '../gql/graphql'

export const GetVaults = gql`
  query GetVaults {
    vaults(orderBy: name, orderDirection: asc) {
      asset {
        address
        name
        symbol
        decimals
        price {
          value
          decimals
        }
      }
      rates(first: 1, where: { side: LENDER }) {
        perBlock
        apy {
          yearly
        }
      }
      address
      name
      symbol
      decimals
      fundAssets
      fundAssetsUSD
    }
  }
`

const GetVaultsSymbols = gql`
  query GetVaultsSymbols {
    vaults(orderBy: name, orderDirection: asc) {
      symbol
    }
  }
`

/**
 * Get list of Vaults
 */
export async function getVaults(client: ApolloClient<any>) {
  const { data, error } = await client.query<GetVaultsQuery>({
    query: GetVaults,
  })
  if (error)
    throw error

  return data
}

/**
 * Get list of symbols of the Vaults
 */
export async function getVaultsSymbols(client: ApolloClient<any>) {
  const { data, error } = await client.query<GetVaultsSymbolsQuery>({
    query: GetVaultsSymbols,
  })
  return { data, error }
}
