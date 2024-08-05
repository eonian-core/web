import { useVaultContext } from '../hooks/use-vault-context'
import { Balance } from './components/balance'

export interface BalanceWithSetterProps {
  disabled: boolean
  balance: bigint
}

/** Will set balance value to form on click */
export function BalanceWithSetter({ disabled, balance }: BalanceWithSetterProps) {
  const { onValueChange, vault } = useVaultContext()

  return (
      <Balance
        vault={vault}
        balance={balance}
        decimals={vault.asset.decimals}
        onChange={onValueChange}
        disabled={disabled}
      />)
}
