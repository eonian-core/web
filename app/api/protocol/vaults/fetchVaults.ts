import { getRscClient } from '../../apollo.rsc-client'
import type { Vault } from '../gql/graphql'
import { getVaults } from '../queries'
import { supportedChainsIds } from '@/web3-onboard'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'

export type VaultsByChain = Record<ChainId, Vault[]>

/** Can be invokend only in server components */
export async function fetchVaults() {
  const promises = supportedChainsIds.map(fetchVault)

  return (await Promise.all(promises))
    .reduce((map, result, index) => {
      map[supportedChainsIds[index]] = result
      return map
    }, {} as VaultsByChain)
}

async function fetchVault(chainId: ChainId): Promise<Vault[]> {
  try {
    const client = getRscClient(chainId)
    const { data } = await getVaults(client)
    return data.vaults as Vault[]
  }
  catch (e) {
    console.warn('Failed to fetch vaults for chain:', chainId, '\nError:', e)
    return []
  }
}
