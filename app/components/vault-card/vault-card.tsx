import { tokensMap } from './content'
import { Distribution, TokenAction, TokenApy, TokenFees, TokenGrowth, TokenStats, YearlyReturns } from './token'
import { VaultUserBalance } from './vault-user-balance'
import type { TokenSymbol } from '@/types'
import { TokenOrder } from '@/types'
import type { Vault } from '@/api'
import { calculateVaultAPY } from '@/finances/apy'
import { getGrowthPercent } from '@/finances/growth'
import { getYearlyROI } from '@/finances/roi'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'

export function getAssetSymbol(vault: Vault): TokenSymbol {
  const name = vault.asset.symbol
  if (name === 'BTCB')
    return 'BTC'

  if (!TokenOrder.includes(name as TokenSymbol))
    throw new Error(`Unknown asset symbol: ${name}`)

  return name as TokenSymbol
}

export interface VaultCardProps {
  chainName: string
  vault: Vault
  pastYearPrice: number
}

export function VaultCard({ chainName, vault, pastYearPrice }: VaultCardProps) {
  const symbol = getAssetSymbol(vault)
  const DefinedToken = tokensMap[symbol]

  const apy = calculateVaultAPY(vault.rates[0].apy.yearly, vault.asset.decimals, 100)
  const growth = getGrowthPercent(vault.asset.price, pastYearPrice)

  const { status: walletStatus } = useWalletWrapperContext()

  return (
        <DefinedToken>
            <TokenStats>
                <YearlyReturns>{getYearlyROI(apy, growth)}%</YearlyReturns>
                <Distribution>
                    <TokenFees>0%</TokenFees>
                    <TokenApy>{apy}%</TokenApy>
                    <TokenGrowth>{growth}%</TokenGrowth>
                </Distribution>
            </TokenStats>

            <TokenAction
                href={`/earn/${chainName}/${vault.symbol}`}
                balance={walletStatus === WalletStatus.NOT_CONNECTED
                  ? undefined
                  : <VaultUserBalance vault={vault} />
                }
            />

        </DefinedToken>
  )
}
