import { useVaultContext } from '../hooks/use-vault-context'
import { useVaultDepositUSD } from '../hooks/use-vault-deposit-change'
import { CommonInfoBlock, InfoBlockDescription, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import CompactNumber from '@/components/compact-number/compact-number'
import IconHandWithDollar from '@/components/icons/icon-hand-with-dollar'

export function VaultToken() {
  const { vault } = useVaultContext()
  const { depositInUSD, decimals } = useVaultDepositUSD(vault)
  return (
    <CommonInfoBlock>
      <InfoBlockTitle>Wallet Insurance</InfoBlockTitle>

      <InfoBlockList>
        <InfoItem>
          <InfoItemIcon><IconHandWithDollar /></InfoItemIcon>
          <InfoItemTitle>You’ll get</InfoItemTitle>
          <InfoItemValue><>~<Amount {...{ depositInUSD, decimals }}/>$ in {vault.symbol}</></InfoItemValue>
        </InfoItem>
      </InfoBlockList>

      <InfoBlockDescription>InsuredBTC wraps your assets and stores them directly in your wallet. You can transfer it at any moment.</InfoBlockDescription>

    </CommonInfoBlock>
  )
}

interface AmountProps {
  depositInUSD: bigint
  decimals: number
}

function Amount({ depositInUSD, decimals }: AmountProps) {
  return (
    <CompactNumber value={depositInUSD} decimals={decimals} fractionDigits={2} hideTooltip />
  )
}
