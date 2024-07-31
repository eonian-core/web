'use client'

import React, { useMemo } from 'react'
import type { Vault } from '../../api'
import { H2, H3 } from '../../components/heading/heading'
import styles from './vault-grid.module.scss'
import { NetworkSelector } from './network-selector'
import { TokenOrder } from '@/types'
import { VaultCard } from '@/components/vault-card/vault-card'
import { Distribution, TokenAction, TokenApy, TokenFees, TokenGrowth, TokenState, TokenStats, YearlyReturns } from '@/components/vault-card/token'
import { getYearlyROI } from '@/finances/roi'
import { BnbToken, DaiToken } from '@/components/vault-card/content'
import { useVaultsContext } from '@/api/vaults/vaults-context'
import { useChainContext } from '@/shared/web3/chain-context'
import { getAssetSymbol } from '@/api/vaults/get-asset-symbol'

const bySymbolOrder = (a: Vault, b: Vault) => TokenOrder.indexOf(getAssetSymbol(a)) - TokenOrder.indexOf(getAssetSymbol(b))

export function VaultGrid() {
  const { vaults } = useVaultsContext()
  const sorted = useMemo(() =>
    Object.values(vaults).sort(bySymbolOrder),
  [vaults])

  const { chainId, setChainId } = useChainContext()

  return (
    <div>
      <div className={styles.header}>
        <div>
          <H2>Select Cryptocurrency</H2>
          <H3>Choose an asset to save and generate passive income</H3>
        </div>
        <NetworkSelector value={chainId} onChange={setChainId} />
      </div>
      <div className={styles.cards}>
        {sorted.map(vault => (
          <VaultCard
            symbol={getAssetSymbol(vault)}
            key={vault.address}
          />
        ))}

        <ComingSoonBNBVaults />
      </div>
    </div>
  )
}

function ComingSoonBNBVaults() {
  return (
    <>
      <BnbToken state={TokenState.Planned}>
        <TokenStats>
            <YearlyReturns>{getYearlyROI(3, 143.5)}%</YearlyReturns>
            <Distribution>
                <TokenFees>0%</TokenFees>
                <TokenApy>3%</TokenApy>
                <TokenGrowth>143.5%</TokenGrowth>
            </Distribution>
        </TokenStats>

        <TokenAction />
      </BnbToken>

      <DaiToken state={TokenState.Planned}>
        <TokenStats>
            <YearlyReturns>{getYearlyROI(10, 0)}%</YearlyReturns>
            <Distribution>
                <TokenFees>0%</TokenFees>
                <TokenApy>10%</TokenApy>
                <TokenGrowth>9%</TokenGrowth>
            </Distribution>
        </TokenStats>

        <TokenAction />
      </DaiToken>
    </>
  )
}
