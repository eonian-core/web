import type { TokenSymbol } from '../../../(landing)/views/offer/token'
import {
  Distribution,
  Tags,
  Token,
  TokenApy,
  TokenFees,
  TokenGrowth,
  TokenHeader,
  TokenStats,
  YearlyReturns,
} from '../../../(landing)/views/offer/token'
import type { Vault } from '../../../api'
import { calculateVaultAPY } from '../../../shared/projections/calculate-apy'
import { getAssetSymbol, getGrowthPercent, getTags, getVaultName, getYearlyROI } from './vault-card-features'
import { VaultUserBalance } from './vault-user-balance'

interface Props {
  chainName: string
  vault: Vault
}

export function VaultCard({ chainName, vault }: Props) {
  const symbol = getAssetSymbol(vault)
  const apy = calculateVaultAPY(vault, 100)
  const growth = getGrowthPercent(vault)
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
}

export function BaseVaultCard({ symbol, balance, href, apy, growth, buttonLabel }: BaseProps) {
  return (
    <div>
      <Token token={symbol} balance={balance} href={href} buttonLabel={buttonLabel}>
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
      </Token>
    </div>
  )
}
