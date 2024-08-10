import { redirect } from 'next/navigation'
import { showEarn } from '../features'

import styles from './page.module.scss'
import { VaultGrid } from './components/vault-grid'
import { VaultsProvider } from '@/api/vaults/vaults-context'
import { fetchVaults } from '@/api/vaults/fetchVaults'

export default async function Page() {
  if (!showEarn)
    redirect('/')

  const vaultsByChain = await fetchVaults()

  return (
    <div className={styles.page}>
      <VaultsProvider vaultsByChain={vaultsByChain}>
        <VaultGrid />
      </VaultsProvider>
    </div>
  )
}
