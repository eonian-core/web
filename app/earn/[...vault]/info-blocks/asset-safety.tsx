import { useVaultDeposit } from '../hooks/use-vault-deposit-change'
import { useVaultContext } from '../hooks/use-vault-context'
import { CommonInfoBlock } from './common-info-block'
import { getAssetSymbol } from '@/earn/components/vault-card/vault-card-features'
import CompactNumber from '@/components/compact-number/compact-number'
import IconArrowRightShort from '@/components/icons/icon-arrow-right-short'

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
      description={<>After deposit of <Amount />, the whole portfolio will be covered by insurance.</>}
    />
  )

  function Amount() {
    return (
      <CompactNumber value={amount} decimals={vault.asset.decimals} fractionDigits={2} hideTooltip>
        &nbsp;{getAssetSymbol(vault)}
      </CompactNumber>
    )
  }
}
