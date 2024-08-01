import type { PropsWithChildren } from 'react'
import { Suspense } from 'react'
import TokensBody from './tokens-body'
import { useVaultsForCurrentChain } from '@/api/vaults/use-vaults'
import { VaultsProvider } from '@/api/vaults/vaults-context'

export default function Tokens({ children }: PropsWithChildren) {
  return (
        <Suspense fallback={<>Loading...</>}>
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
