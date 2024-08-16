import { useSuspenseQuery } from '@apollo/client'
import { GetVaults } from '../queries'
import type { GetVaultsQuery, Vault } from '../gql/graphql'

export function useVaultsForCurrentChain(): Array<Vault> {
  const { data } = useSuspenseQuery<GetVaultsQuery>(GetVaults)
  return (data?.vaults || []) as Vault[]
}
