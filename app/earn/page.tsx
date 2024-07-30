import { redirect } from 'next/navigation'
import { showEarn } from '../features'

import styles from './page.module.scss'
import { VaultGrid } from './components/vault-grid'
import { ChainProvider } from '@/shared/web3/chain-context'
import { VaultsProvider } from '@/api/vaults/vaults-context'
import { fetchVaults } from '@/api/vaults/fetchVaults'

export default async function Page() {
  if (!showEarn) 
    redirect('/')

  const vaultsByChain = await fetchVaults()

  return (
    <div className={styles.page}>
      <ChainProvider>
        <VaultsProvider vaultsByChain={vaultsByChain}>
          <VaultGrid />
        </VaultsProvider>
      </ChainProvider>
    </div>
  )
}

