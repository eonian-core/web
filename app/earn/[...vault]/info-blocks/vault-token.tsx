import { useVaultContext } from '../hooks/use-vault-context'
import { useVaultDepositUSD } from '../hooks/use-vault-deposit-change'
import { CommonInfoBlock } from './common-info-block'
import CompactNumber from '@/components/compact-number/compact-number'
import IconHandWithDollar from '@/components/icons/icon-hand-with-dollar'

export function VaultToken() {
  const { vault } = useVaultContext()
  const { depositInUSD, decimals } = useVaultDepositUSD(vault)
  return (
    <CommonInfoBlock
      title="Wallet Insurance"
      items={[
        {
          title: 'You’ll get',
          value: <>~<Amount />$ in {vault.symbol}</>,
          icon: <IconHandWithDollar />,
        },
      ]}
      description={
        <>InsuredBTC wraps your assets and stores them directly in your wallet. You can transfer it at any moment.</>
      }
    />
  )

  function Amount() {
    return (
      <CompactNumber value={depositInUSD} decimals={decimals} fractionDigits={2} hideTooltip />
    )
  }
}
