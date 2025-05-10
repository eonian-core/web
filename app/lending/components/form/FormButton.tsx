import { Button } from '@heroui/react'
import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import type { FormData } from '../../LendingState'
import { useLendingState } from '../../LendingState'
import { ButtonStateType, getButtonBehavior, useButtonState } from './useButtonState'
import { FORM_INPUT_ID } from './FormInput'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'

interface Props {
  inputData: NumberInputValue
  formData: FormData
  closeModal: () => void
}

export function FormButton({ inputData, formData, closeModal }: Props) {
  const { doFormAction, chainId: lendingChainId } = useLendingState()
  const { connect, setCurrentChain } = useWalletWrapperContext()
  const [text, buttonStateType] = useButtonState(inputData, formData)

  const buttonBehavior = getButtonBehavior(buttonStateType)
  const isDisabled = buttonBehavior === 'disabled'
  const isLoading = buttonBehavior === 'loading'

  const handleClick = async () => {
    switch (buttonStateType) {
      case ButtonStateType.READY: {
        const success = await doFormAction(inputData)
        if (success)
          closeModal()

        break
      }
      case ButtonStateType.WALLET_NOT_CONNECTED:
        void connect()
        break
      case ButtonStateType.CHAIN_NOT_SUPPORTED:
        void setCurrentChain(lendingChainId)
        break
      case ButtonStateType.INPUT_EMPTY:
        document.getElementById(FORM_INPUT_ID)?.focus()
        break
      default:
        throw new Error(`Unknown button state: ${buttonStateType}`)
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Button color={isDisabled ? 'default' : 'primary'} size="lg" fullWidth onPress={handleClick} isLoading={isLoading}>
      {text}
    </Button>
  )
}
