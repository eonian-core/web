import { useVaultDeposit } from '../hooks/use-vault-deposit-change'
import { parseBigIntValue } from '../hooks/use-number-input-value'
import { RawFormInput } from './components/raw-form-input'
import { INPUT_ID } from './form-input'
import { InputIcon } from './components/input-icon'
import type { Vault } from '@/api'

interface Props {
  label: string
  vault: Vault
}

export function FormPreview({ label, vault }: Props) {
  const { decimals } = vault.asset

  const [deposit] = useVaultDeposit()

  const handleClick = () => {
    const input = document.getElementById(INPUT_ID)
    input?.focus()
  }

  const [, value] = parseBigIntValue(deposit, decimals)

  return (
    <RawFormInput
      label={label}
      vault={vault}
      value={value === '0' ? '' : value}
      placeholder='0'
      inputStart={<InputIcon type='PREVIEW' vault={vault} />}
      readOnly
      onClick={handleClick}
    />
  )
}
