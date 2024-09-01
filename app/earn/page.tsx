import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { showEarn } from '../features'

import styles from './page.module.scss'
import { VaultGrid } from './components/vault-grid'
import SkeletonPage from './skeleton-page'
import { VaultsProvider } from '@/api/protocol/vaults/vaults-context'
import { fetchVaults } from '@/api/protocol/vaults/fetch-vaults'

export default function Page() {
  if (!showEarn)
    redirect('/')

  return (
    <Suspense fallback={<SkeletonPage />}>
      <InnerPage />
    </Suspense>
  )
}

async function InnerPage() {
  const vaultsByChain = await fetchVaults()
  return (
    <div className={styles.page}>
      <VaultsProvider vaultsByChain={vaultsByChain}>
        <VaultGrid />
      </VaultsProvider>
    </div>
  )
}
