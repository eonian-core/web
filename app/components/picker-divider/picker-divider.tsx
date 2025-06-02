import { Button } from '@heroui/react'
import clsx from 'clsx'
import { useCallback } from 'react'
import styles from './arrow-divider.module.scss'
import { ArrowDividerBody } from './arrow-divider-body'
import { useLocalCompactBigInt } from '@/components/compact-number/compact-number'
import { FractionPartView } from '@/finances/humanize'
import { useDivToPercent, useMultiplyOnPercent, usePercentToBigInt } from '@/finances/percent'

export interface PickerDividerProps {
  children: Array<number>
  balance: bigint
  decimals: number
  inputValue: bigint
  onValueChange: (value: string | bigint) => void
  reverse?: boolean
  onClick?: () => void
  show?: boolean
  withBottomMargin?: boolean
}

export function PickerDivider({ balance, decimals, inputValue, onValueChange, children: options, reverse, onClick, show, withBottomMargin }: PickerDividerProps) {
  return (
    <ArrowDividerBody reverse={reverse} onClick={onClick} withBottomMargin={withBottomMargin}>
      {show
        ? <PercentPicker {...{
          balance,
          decimals,
          inputValue,
          onValueChange,
          options,
        }}>{options}</PercentPicker>
        : null}
    </ArrowDividerBody>
  )
}

export interface PercentPickerProps {
  children: Array<number>
  balance: bigint
  decimals: number
  inputValue: bigint
  onValueChange: (value: string | bigint) => void
}

export function PercentPicker({ children, balance, inputValue, decimals, onValueChange }: PercentPickerProps) {
  const currentPercent = useDivToPercent(inputValue, balance)

  return (
    <div className={styles.percentPicker}>
      {children.map(option => (
        <PercentOption
          key={option}
          {...{ currentPercent, balance, onValueChange, decimals }}
                >{option}</PercentOption>
      ),
      )}
    </div>
  )
}

export interface PercentOptionProps {
  children: number
  currentPercent: bigint
  balance: bigint
  decimals: number
  onValueChange: (value: string | bigint) => void
}

const formatOptions = {
  threshold: 0n,
  fractionDigits: 5,
  fractionPartView: FractionPartView.CUT,
}

export function PercentOption({ children: option, currentPercent, balance, decimals, onValueChange }: PercentOptionProps) {
  const value = useMultiplyOnPercent(balance, option)
  const { raw, result: formated } = useLocalCompactBigInt(value, decimals, formatOptions)

  const onClick = useCallback(() => {
    if (raw === formated // formating unnnecessary, will use raw
            || Number.isNaN(+formated) // formated number can be something like "<0.00001", will use raw
            || option === 1 // option is 100%, will use raw
            || raw === `${formated}.0` // raw equals formated with ".0" at the end, will use raw
    ) {
      onValueChange(raw)
      return
    }

    // number were cutted, but it not 100%,
    // so need add at least one digit to make it greater or equal the real number
    // calculations can be compex and any digites lower than 9 can result in lower number
    onValueChange(`${formated}9`)
  }, [onValueChange, raw, formated, option])

  const optionN = usePercentToBigInt(option)

  return (
    <Button className={clsx(styles.option, { [styles.active]: optionN <= currentPercent })} size="sm" variant="light" onClick={onClick}>
      {option * 100}%
    </Button>
  )
}
