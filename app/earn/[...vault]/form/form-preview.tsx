import { useVaultDeposit } from '../hooks/use-vault-deposit-change'
import { useVaultContext } from '../hooks/use-vault-context'
import { RawFormInput } from './components/raw-form-input'
import { HealthyLabel } from './components/healthy-label'
import { PreviewInputCoin } from './components/input-icon'
import { focusOnInput } from './form-input'
import { BalanceWithSetter } from './balance-with-setter'
import { Price } from './components/price'
import { useAppSelector } from '@/store/hooks'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { RawCompactNumber, useLocalCompactBigInt } from '@/components/compact-number/compact-number'
import { FractionPartView } from '@/finances/humanize/format-number'
import { toStringNumberFromDecimals } from '@/shared/web3'

const formatOptions = {
  threshold: 0n,
  fractionDigits: 5,
  fractionPartView: FractionPartView.DOTS,
}

export function FormPreview({ disabled }: { disabled: boolean }) {
  const { vault } = useVaultContext()
  const [deposit] = useVaultDeposit()
  const { inputValue, placeholderDisplayValue } = useVaultContext()

  const { vaultBalanceBN } = useAppSelector(state => state.vaultUser)
  const { status } = useWalletWrapperContext()

  const formattedValue = useLocalCompactBigInt(deposit, vault.asset.decimals, formatOptions)
  const accurateValue = toStringNumberFromDecimals(deposit, vault.asset.decimals)

  return (
    <RawFormInput
      preview
      label={'Savings Account'}
      placeholder={placeholderDisplayValue}
      inputStart={<PreviewInputCoin vault={vault} />}
      readOnly
      onClick={focusOnInput}
      headerEnd={<HealthyLabel showValue={status === WalletStatus.CONNECTED && inputValue !== 0n}>
        <BalanceWithSetter {...{
          disabled,
          balance: BigInt(vaultBalanceBN),
        }} />
      </HealthyLabel>}
      price={<Price vault={vault}>{formattedValue.raw}</Price>}
    >
      <RawCompactNumber
          value={formattedValue.result}
          tooltipContent={accurateValue}
       />
    </RawFormInput>
  )
}
