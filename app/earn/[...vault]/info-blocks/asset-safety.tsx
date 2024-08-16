import { useVaultDeposit } from '../hooks/use-vault-deposit-change'
import { useVaultContext } from '../hooks/use-vault-context'
import { CommonInfoBlock } from './common-info-block'
import CompactNumber from '@/components/compact-number/compact-number'
import IconArrowRightShort from '@/components/icons/icon-arrow-right-short'
import { getAssetSymbol } from '@/api/protocol/vaults/get-asset-symbol'
import type { TokenSymbol } from '@/types'

export function AssetSafety() {
  const [amount] = useVaultDeposit()
  const { vault } = useVaultContext()
  return (
    <CommonInfoBlock
      title="Asset Safety"
      items={[{
        title: 'Portfolio',
        value: 'Fully Protected',
        icon: <IconArrowRightShort />,
      }]}
      description={<Amount amount={amount} decimals={vault.asset.decimals} symbol={getAssetSymbol(vault)} />}
    />
  )
}

interface AmountProps {
  amount: bigint
  decimals: number
  symbol: TokenSymbol
}

function Amount({ amount, decimals, symbol }: AmountProps) {
  return (<>After deposit of <CompactNumber value={amount} decimals={decimals} fractionDigits={2} hideTooltip>
    &nbsp;{symbol}
  </CompactNumber>, the whole portfolio will be covered by insurance.
  </>)
}
