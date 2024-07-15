import { useVaultDeposit } from '../hooks/use-vault-deposit-change'
import { parseBigIntValue } from '../hooks/use-number-input-value'
import { useVaultInputContext } from '../hooks/use-vault-input-context'
import { RawFormInput } from './components/raw-form-input'
import { INPUT_ID } from './form-input'
import { InputIcon } from './components/input-icon'
import type { Vault } from '@/api'
import { FormAction } from '@/store/slices/vaultActionSlice'

interface Props {
  vault: Vault
}

export function FormPreview({ vault }: Props) {
  const { formAction } = useVaultInputContext()

  const { decimals } = vault.asset

  const [deposit] = useVaultDeposit()

  const handleClick = () => {
    const input = document.getElementById(INPUT_ID)
    input?.focus()
  }

  const [, value] = parseBigIntValue(deposit, decimals)

  const label = formAction === FormAction.DEPOSIT ? 'To Your Account' : 'To Your Wallet'

  return (
    <RawFormInput
      label={label}
      vault={vault}
      value={value === '0' ? '' : value}
      placeholder="0"
      inputStart={<InputIcon type="PREVIEW" vault={vault} />}
      readOnly
      onClick={handleClick}
    />
  )
}
