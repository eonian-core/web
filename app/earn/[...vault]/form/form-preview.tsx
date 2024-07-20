import { useVaultDeposit } from '../hooks/use-vault-deposit-change'
import { parseBigIntValue } from '../hooks/use-number-input-value'
import { useVaultContext } from '../hooks/use-vault-context'
import { RawFormInput } from './components/raw-form-input'
import { INPUT_ID } from './form-input'
import { InputIcon } from './components/input-icon'
import { HealthyLabel } from './components/healthy-label'
import { FormAction } from '@/store/slices/vaultActionSlice'

export function FormPreview() {
  const { formAction, vault } = useVaultContext()

  const { decimals } = vault.asset

  const [deposit] = useVaultDeposit()

  const handleClick = () => {
    const input = document.getElementById(INPUT_ID)
    input?.focus()
  }

  const [, value] = parseBigIntValue(deposit, decimals)

  const isDeposit = formAction === FormAction.DEPOSIT
  const label = isDeposit ? 'To Your Account' : 'To Your Wallet'

  return (
    <RawFormInput
      label={label}
      vault={vault}
      value={value === '0' ? '' : value}
      placeholder="0"
      inputStart={<InputIcon type="PREVIEW" vault={vault} />}
      readOnly
      onClick={handleClick}
      headerEnd={isDeposit ? <HealthyLabel /> : undefined}
    />
  )
}
