import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import { useAvailableBalanceByTab } from '../../hooks/useAvailableBalanceByTab'
import { PickerDivider } from '@/components/picker-divider/picker-divider'

const options = [0.25, 0.5, 0.75, 1]

const decimals = 18

interface FormPickerProps {
  inputData: NumberInputValue
}

function dubmFunction() {}

export function FormPicker({ inputData: { value = 0n, onValueChange } }: FormPickerProps) {
  const { balanceInUnderlying } = useAvailableBalanceByTab()

  return (
    <PickerDivider
      balance={balanceInUnderlying}
      decimals={decimals}
      inputValue={value}
      onValueChange={onValueChange}
      reverse={false}
      onClick={dubmFunction}
      show={balanceInUnderlying > 0n}
    >{options}</PickerDivider>
  )
}
