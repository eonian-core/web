import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useVaultContext } from '../hooks/use-vault-context'
import { Balance } from './components/balance'
import { focusOnInput } from './form-input'

export interface BalanceWithSetterProps {
  disabled: boolean
  balance: bigint
}

/** Will set balance value to form on click */
export function BalanceWithSetter({ disabled, balance }: BalanceWithSetterProps) {
  const { onValueChange, vault } = useVaultContext()
  const decimals = vault.asset.decimals

  const onClick = useCallback(() => {
    const value = ethers.formatUnits(balance, decimals)
    onValueChange(Number.isNaN(+value) || +value === 0 ? '0' : value)

    focusOnInput()
  }, [balance, decimals, onValueChange])

  return (<Balance {...{
    vault,
    decimals,
    balance,
    disabled,
    onClick,
  }} />)
}
