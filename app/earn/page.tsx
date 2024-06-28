import { redirect } from 'next/navigation'
import type { Vault } from '../api'
import { getClient, getVaults } from '../api'
import { showEarn } from '../features'
import type { ChainId } from '../providers/wallet/wrappers/helpers'
import { supportedChainsIds } from '../web3-onboard'

import styles from './page.module.scss'
import type { VaultsByChain } from './components/vault-grid'
import { VaultGrid } from './components/vault-grid'

export const revalidate = 30

export default async function Page() {
  if (!showEarn)
    redirect('/')

  const vaultsByChain = await fetchVaults()
  return (
    <div className={styles.page}>
      <VaultGrid vaultsByChain={vaultsByChain} />
    </div>
  )
}

async function fetchVaults() {
  const promises = supportedChainsIds.map(fetchVault)
  const results = await Promise.all(promises)
  return results.reduce((map, result, index) => {
    map[supportedChainsIds[index]] = result
    return map
  }, {} as VaultsByChain)
}

async function fetchVault(chainId: ChainId): Promise<Vault[]> {
  try {
    const client = getClient(chainId)
    const { data } = await getVaults(client)
    return data.vaults as Vault[]
  }
  catch (e) {
    return []
  }
}
