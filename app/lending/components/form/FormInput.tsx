import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@heroui/react'
import type { FormData } from '../../LendingState'
import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import { useAvailableBalanceByTab } from '../../hooks/useAvailableBalanceByTab'
import { convertUnderlyingToUSD, formatUSD } from '../../web3/utils'

interface Props {
  formData: FormData
  inputData: NumberInputValue
}

export const FORM_INPUT_ID = 'form-input'

export function FormInput({ formData, inputData }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { balanceInUnderlying, label, balanceInUnderlyingDisplay } = useAvailableBalanceByTab()

  useEffect(() => {
    if (inputRef.current)
      inputRef.current.focus()
  }, [formData.tab])

  const handleMaxClick = useCallback(() => {
    inputData.onValueChange(balanceInUnderlying)
    inputRef.current?.focus()
  }, [balanceInUnderlying, inputData])

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex justify-between text-sm text-foreground-500">
        <span>Amount</span>
        <span className="text-foreground-500 hover:text-foreground-300 cursor-pointer" onClick={handleMaxClick}>
          {label}: <span className="font-medium">{balanceInUnderlyingDisplay}</span>
        </span>
      </div>
      <div>
        <div
          className="p-2 bg-transparent hover:!bg-transparent border border-[hsl(var(--heroui-default-700))] rounded-lg focus-within:!bg-transparent focus-within:border focus-within:border-primary"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center">
            <input
              id={FORM_INPUT_ID}
              ref={inputRef}
              type="text"
              className="text-2xl bg-transparent outline-none border-none w-full"
              value={inputData.displayValue}
              placeholder="0"
              autoComplete="off"
              onChange={e => inputData.onValueChange(e.target.value)}
            />
            <div className="flex items-center justify-center gap-2">
              <div className={cn('w-5 h-5 flex items-center justify-center', !inputData.value ? 'opacity-75' : '')}>
                {formData.market.icon}
              </div>
              <div className={inputData.value ? 'text-[var(--color-text-300)]' : 'text-foreground-500'}>
                {formData.market.underlyingSymbol}
              </div>
            </div>
          </div>
          <div className="text-sm text-foreground-500">{formatUSD(convertUnderlyingToUSD(inputData.value || 0n, formData.market))}</div>
        </div>
      </div>
    </div>
  )
}
