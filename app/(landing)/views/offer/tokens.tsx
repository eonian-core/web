import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import TokensBody from './tokens-body'
import styles from './offer.module.scss'
import { VaultsProvider } from '@/api/protocol/vaults/vaults-context'
import { CardSkeleton } from '@/components/vault-card/card-skeleton'
import { getVaultsByChain } from '@/api/protocol/vaults/multicall/fetch-vaults-via-multicall'
import { ChainId } from '@/providers/wallet/wrappers/helpers'
import type { Vault } from '@/types'

export default function Tokens({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState(true)
  const [vaults, setVaults] = useState<Vault[]>([])

  useEffect(() => {
    const fetchVaults = async () => {
      const vaults = await getVaultsByChain(ChainId.BSC_MAINNET)
      setVaults(vaults)
      setLoading(false)
    }
    void fetchVaults()
  }, [])

  if (isLoading) {
    return (
      <div className={styles.tokens}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    )
  }

  return (
    <VaultsProvider currentChainVaults={vaults}>
      <TokensBody>{children}</TokensBody>
    </VaultsProvider>
  )
}
