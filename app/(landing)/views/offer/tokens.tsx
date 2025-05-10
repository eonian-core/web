import type { PropsWithChildren } from 'react'
import { Suspense } from 'react'
import TokensBody from './tokens-body'
import styles from './offer.module.scss'
import { VaultsProvider } from '@/api/protocol/vaults/vaults-context'
import { CardSkeleton } from '@/components/vault-card/card-skeleton'
import { getVaultsByChain } from '@/api/protocol/vaults/multicall/fetch-vaults-via-multicall'
import { ChainId } from '@/providers/wallet/wrappers/helpers'

export default function Tokens({ children }: PropsWithChildren) {
  return (
    <Suspense
      fallback={
        <div className={styles.tokens}>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      }
    >
      <TokensProvider>
        <TokensBody>{children}</TokensBody>
      </TokensProvider>
    </Suspense>
  )
}

const promise = getVaultsByChain(ChainId.BSC_MAINNET)

async function TokensProvider({ children }: PropsWithChildren) {
  const vaults = await promise

  return <VaultsProvider currentChainVaults={vaults}>{children}</VaultsProvider>
}
