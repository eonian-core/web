import type { PropsWithChildren } from 'react'
import { OneLineSkeleton } from '../loader/skeleton-loader'
import { tokensMap } from './content'
import { Distribution, TokenApy, TokenFees, TokenFooter, TokenGrowth, TokenStats, YearlyReturns } from './token'
import { VaultUserBalance } from './vault-user-balance'
import { calculateVaultAPY } from '@/finances/apy'
import { getGrowthPercent } from '@/finances/growth'
import { getYearlyROI } from '@/finances/roi'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { useTokenPrice } from '@/api/coin-gecko/useTokenPrice'
import { useVaultsContext } from '@/api/vaults/vaults-context'
import type { TokenSymbol } from '@/types'

export interface VaultCardProps extends PropsWithChildren {
  symbol: TokenSymbol
  style?: React.CSSProperties
}

export function VaultCard({ symbol, children, style }: VaultCardProps) {
  const { vaults } = useVaultsContext()
  const vault = vaults[symbol]

  const DefinedToken = tokensMap[symbol]

  const apy = calculateVaultAPY(vault.rates[0].apy.yearly, vault.asset.decimals, 100)

  const { data } = useTokenPrice(symbol)
  const pastYearPrice = data?.pastYearPrice
  const growth = isNumber(pastYearPrice) && getGrowthPercent(vault.asset.price, pastYearPrice)

  const { status: walletStatus } = useWalletWrapperContext()

  return (
    <DefinedToken style={style}>
        <TokenStats>
            <YearlyReturns>{isNumber(growth)
              ? `${getYearlyROI(apy, growth)}%`
              : <OneLineSkeleton />
            }</YearlyReturns>
            <Distribution>
                <TokenFees>0%</TokenFees>
                <TokenApy>{apy}%</TokenApy>
                <TokenGrowth>{isNumber(growth)
                  ? `${growth.toFixed(2)}%`
                  : <OneLineSkeleton />
                }</TokenGrowth>
            </Distribution>
        </TokenStats>

        <TokenFooter
            balance={walletStatus === WalletStatus.NOT_CONNECTED
              ? undefined
              : <VaultUserBalance vault={vault} />
            }
        >{children}</TokenFooter>

    </DefinedToken>
  )
}

function isNumber(value: any): value is number {
  return typeof value === 'number'
}
