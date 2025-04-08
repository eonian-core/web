'use client'

import React, { useMemo } from 'react'
import type { Vault } from '../../api'

import styles from './vault-grid.module.scss'
import { NetworkSelector } from './network-selector'
import { Header } from './header'
import { VaultGridSkeleton } from './vault-grid-skeleton'
import { TokenOrder } from '@/types'
import { VaultCard } from '@/components/vault-card/vault-card'
import { Distribution, TokenAction, TokenApy, TokenFees, TokenFooter, TokenGrowth, TokenState, TokenStats, YearlyReturns } from '@/components/vault-card/token'
import { getYearlyROI } from '@/finances/roi'
import { BnbToken, DaiToken } from '@/components/vault-card/content'
import { useVaultsContext } from '@/api/protocol/vaults/vaults-context'
import { getAssetSymbol } from '@/api/protocol/vaults/get-asset-symbol'
import { useChainContext } from '@/shared/web3/chain-context'
import { buildFadeInAnitionStyles, useAnimation } from '@/components/fade-in/fade-in-child-list'
import { SuggestTokenButton } from '@/earn/components/suggest-token-button'

const bySymbolOrder = (a: Vault, b: Vault) => TokenOrder.indexOf(getAssetSymbol(a)) - TokenOrder.indexOf(getAssetSymbol(b))

const fadeInDuration = 0.1

export function VaultGrid() {
  const { chainName } = useChainContext()
  const { vaults } = useVaultsContext()
  const sorted = useMemo(() =>
    Object.values(vaults).sort(bySymbolOrder),
  [vaults])

  const { maxIsVisible } = useAnimation(sorted.length + 2, true, 0.05)

  return (
    <div>
      <div className={styles.header}>
        <Header />
        <NetworkSelector />
      </div>
      {maxIsVisible <= 0
        ? <VaultGridSkeleton />
        : (
          <div className={styles.cards}>
            {sorted.map((vault, i) => (
              <VaultCard
                symbol={getAssetSymbol(vault)}
                key={vault.address}
                style={buildFadeInAnitionStyles(maxIsVisible > i, fadeInDuration)}
            >
                <TokenAction
                  href={`/earn/${chainName}/${vault.symbol}`}
              >Save</TokenAction>
              </VaultCard>
            ))}

            <ComingSoonBNBVaults maxIsVisible={maxIsVisible - sorted.length} />
          </div>
          )}

      <SuggestTokenButton />
    </div>
  )
}

function ComingSoonBNBVaults({ maxIsVisible }: { maxIsVisible: number }) {
  return (
    <>
      <BnbToken state={TokenState.Planned} style={buildFadeInAnitionStyles(maxIsVisible > 0, fadeInDuration)}>
        <TokenStats>
          <YearlyReturns>{getYearlyROI(3, 143.5)}%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>3%</TokenApy>
            <TokenGrowth>143.5%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenFooter>
          <TokenAction>Coming soon</TokenAction>
        </TokenFooter>
      </BnbToken>

      <DaiToken state={TokenState.Planned} style={buildFadeInAnitionStyles(maxIsVisible > 1, fadeInDuration)}>
        <TokenStats>
          <YearlyReturns>{getYearlyROI(10, 0)}%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>10%</TokenApy>
            <TokenGrowth>9%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenFooter>
          <TokenAction>Coming soon</TokenAction>
        </TokenFooter>
      </DaiToken>
    </>
  )
}
