import type { PropsWithChildren } from 'react'
import { Suspense } from 'react'
import TokensBody from './tokens-body'
import styles from './offer.module.scss'
import { useVaultsForCurrentChain } from '@/api/vaults/use-vaults'
import { VaultsProvider } from '@/api/vaults/vaults-context'
import { CardSkeleton } from '@/components/vault-card/card-skeleton'

export default function Tokens({ children }: PropsWithChildren) {
  return (
        <Suspense fallback={(
            <div className={styles.tokens}>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        )}>
            <TokensProvider>
                <TokensBody>
                    {children}
                </TokensBody>
            </TokensProvider>
        </Suspense>
  )
}

function TokensProvider({ children }: PropsWithChildren) {
  const vaults = useVaultsForCurrentChain()

  return (
        <VaultsProvider currentChainVaults={vaults}>
            {children}
        </VaultsProvider>
  )
}
