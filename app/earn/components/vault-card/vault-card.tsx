import {
  Distribution,
  Tags,
  Token,
  TokenAction,
  TokenApy,
  TokenFees,
  TokenGrowth,
  TokenHeader,
  TokenStats,
  YearlyReturns,
} from '../../../components/vault-card/token'
import type { Vault } from '../../../api'
import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { calculateVaultAPY } from '../../../shared/projections/calculate-apy'
import { getAssetSymbol, getGrowthPercent, getTags, getVaultName, getYearlyROI } from './vault-card-features'
import { VaultUserBalance } from './vault-user-balance'
import type { TokenSymbol } from '@/types'

interface Props {
  chainName: string
  vault: Vault
  pastYearPrice: number
}

export function VaultCard({ chainName, vault, pastYearPrice }: Props) {
  const symbol = getAssetSymbol(vault)
  const apy = calculateVaultAPY(vault, 100)
  const growth = getGrowthPercent(vault, pastYearPrice)
  const href = `/earn/${chainName}/${vault.symbol}`
  return <BaseVaultCard href={href} symbol={symbol} balance={<VaultUserBalance vault={vault} />} apy={apy} growth={growth} />
}

interface BaseProps {
  symbol: TokenSymbol
  balance?: React.ReactNode
  apy: number
  growth: number
  href?: string
  buttonLabel?: string
  buttonDisabled?: boolean
}

export function BaseVaultCard({ symbol, balance, href, apy, growth, buttonLabel, buttonDisabled }: BaseProps) {
  const { status: walletStatus } = useWalletWrapperContext()
  const balanceElement = walletStatus === WalletStatus.NOT_CONNECTED ? undefined : balance
  return (
    <div>
      <Token token={symbol} balance={balanceElement} href={href}>
        <TokenHeader>{getVaultName(symbol)}</TokenHeader>
        <Tags>{getTags(symbol)}</Tags>
        <TokenStats>
          <YearlyReturns>{getYearlyROI(apy, growth)}%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>{apy}%</TokenApy>
            <TokenGrowth>{growth}%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenAction disabled={buttonDisabled}>{buttonLabel}</TokenAction>
      </Token>
    </div>
  )
}
