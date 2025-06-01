import { useCallback, useEffect, useRef } from 'react'
import clsx from 'clsx'
import type { FormData } from '../../LendingState'
import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import { useAvailableBalanceByTab } from '../../hooks/useAvailableBalanceByTab'
import { convertUnderlyingToUSD, formatUSD } from '../../web3/utils'
import styles from './FormInput.module.scss'

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

  const handleInputWrapperClick = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={styles.formInputContainer}>
      <div className={styles.amountRow}>
        <span>Amount</span>
        <span className={styles.maxButton} onClick={handleMaxClick}>
          {label}: <span className={styles.balanceLabel}>{balanceInUnderlyingDisplay}</span>
        </span>
      </div>
      <div
        className={styles.inputWrapperInner}
        onClick={handleInputWrapperClick}
      >
        <div className={styles.inputRow}>
          <input
            id={FORM_INPUT_ID}
            ref={inputRef}
            type="text"
            className={styles.inputField}
            value={inputData.displayValue}
            placeholder="0"
            autoComplete="off"
            onChange={e => inputData.onValueChange(e.target.value)}
          />
          <div className={styles.tokenSection}>
            <div className={clsx(styles.tokenIconWrapper, !inputData.value && styles.tokenIconOpacity)}>
              {formData.market.icon}
            </div>
            <div className={inputData.value ? styles.tokenSymbolWithValue : styles.tokenSymbolDefault}>
              {formData.market.underlyingSymbol}
            </div>
          </div>
        </div>
        <div className={styles.valueInUSD}>{formatUSD(convertUnderlyingToUSD(inputData.value || 0n, formData.market))}</div>
      </div>
    </div>
  )
}
