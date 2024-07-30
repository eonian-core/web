import { tokensMap } from './content'
import { Distribution, TokenAction, TokenApy, TokenFees, TokenGrowth, TokenStats, YearlyReturns } from './token'
import { VaultUserBalance } from './vault-user-balance'
import { calculateVaultAPY } from '@/finances/apy'
import { getGrowthPercent } from '@/finances/growth'
import { getYearlyROI } from '@/finances/roi'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'
import { useTokenPrice } from '@/api/coin-gecko/useTokenPrice'
import { useVaultsContext } from '@/api/vaults/vaults-context'
import { TokenSymbol } from '@/types'
import { useChainContext } from '@/shared/web3/chain-context'


export interface VaultCardProps {
  symbol: TokenSymbol
}

export function VaultCard({ symbol  }: VaultCardProps) {
  const {chainName} = useChainContext()
  const { vaults } = useVaultsContext()
  const vault = vaults[symbol]

  const DefinedToken = tokensMap[symbol]

  const apy = calculateVaultAPY(vault.rates[0].apy.yearly, vault.asset.decimals, 100)

  const {data} = useTokenPrice(symbol)
  const pastYearPrice = data?.pastYearPrice
  const growth = isNumber(pastYearPrice) && getGrowthPercent(vault.asset.price, pastYearPrice) 

  const { status: walletStatus } = useWalletWrapperContext()

  return (
    <DefinedToken>
        <TokenStats>
            <YearlyReturns>{isNumber(growth) 
              ? `${getYearlyROI(apy, growth)}%`
              : <OneLineLoader />
            }</YearlyReturns>
            <Distribution>
                <TokenFees>0%</TokenFees>
                <TokenApy>{apy}%</TokenApy>
                <TokenGrowth>{isNumber(growth)
                  ? `${growth.toFixed(2)}%`
                  : <OneLineLoader />
                }</TokenGrowth>
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

function isNumber(value: any): value is number {
  return typeof value === 'number';
}

const OneLineLoader: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader 
    speed={2}
    width={60}
    height={30}
    viewBox="0 0 60 30"
    backgroundColor="#b6b6b6"
    foregroundColor="#c9c7c7"
    {...props}
  >
    <rect x="0" y="10" rx="3" ry="3" width="60" height="15" />
  </ContentLoader>
)