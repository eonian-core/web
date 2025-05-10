import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { showEarn } from '../features'

import styles from './page.module.scss'
import { VaultGrid } from './components/vault-grid'
import SkeletonPage from './skeleton-page'
import { VaultsProvider } from '@/api/protocol/vaults/vaults-context'
import { fetchVaultsViaMulticall } from '@/api/protocol/vaults/multicall/fetch-vaults-via-multicall'
import { ChainId, getMulticallAddress } from '@/providers/wallet/wrappers/helpers'

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
  const multicallAddress = getMulticallAddress(ChainId.BSC_MAINNET)
  const vaults = await fetchVaultsViaMulticall(ChainId.BSC_MAINNET, multicallAddress)
  return (
    <div className={styles.page}>
      <VaultsProvider vaultsByChain={{ [ChainId.BSC_MAINNET]: vaults, [ChainId.SEPOLIA]: [], [ChainId.UNKNOWN]: [] }}>
        <VaultGrid />
      </VaultsProvider>
    </div>
  )
}
