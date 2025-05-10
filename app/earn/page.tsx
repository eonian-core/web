import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { showEarn } from '../features'

import styles from './page.module.scss'
import { VaultGrid } from './components/vault-grid'
import SkeletonPage from './skeleton-page'
import { VaultsProvider } from '@/api/protocol/vaults/vaults-context'
import { getVaultsByChain } from '@/api/protocol/vaults/multicall/fetch-vaults-via-multicall'
import { ChainId } from '@/providers/wallet/wrappers/helpers'

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
  const vaults = await getVaultsByChain(ChainId.BSC_MAINNET)
  return (
    <div className={styles.page}>
      <VaultsProvider vaultsByChain={{ [ChainId.BSC_MAINNET]: vaults, [ChainId.UNKNOWN]: [] }}>
        <VaultGrid />
      </VaultsProvider>
    </div>
  )
}
