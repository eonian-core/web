import { Slider } from '@heroui/react'
import clsx from 'clsx'
import { useCallback, useMemo } from 'react'
import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import { useAvailableBalanceByTab } from '../../hooks/useAvailableBalanceByTab'
import styles from './FormSlider.module.scss'
import { FormTab } from './types'
import { PickerDivider } from '@/components/picker-divider/picker-divider'
import { useLendingState } from '@/lending/LendingState'

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
interface Props {
  inputData: NumberInputValue
}

const marks = [
  { value: 0, offset: '4px' },
  { value: 25, offset: 'calc(25% + 5px)' },
  { value: 50, offset: '50%' },
  { value: 75, offset: 'calc(75% - 5px)' },
  { value: 100, offset: 'calc(100% - 4px)' },
]

export function FormSlider({ inputData }: Props) {
  const { value = 0n, onValueChange } = inputData
  const { balanceInUnderlying } = useAvailableBalanceByTab()

  const sliderValue = balanceInUnderlying === 0n ? 0 : Number((value * 100n) / balanceInUnderlying)

  const handleChange = useCallback(
    (value: number | number[]) => {
      const numberValue = typeof value === 'number' ? value : value[0]
      const newValue = (BigInt(numberValue) * balanceInUnderlying) / 100n
      onValueChange(newValue)
    },
    [balanceInUnderlying, onValueChange],
  )

  const markElements = useMemo(() => {
    return marks.map((mark) => {
      return {
        value: mark.value,
        trackMark: <SliderTrackMark key={mark.value} passed={mark.value <= sliderValue} offset={mark.offset} />,
        markLabel: (
          <SliderTrackMarkLabel
            key={mark.value}
            value={mark.value}
            offset={mark.offset}
            isActive={mark.value <= sliderValue}
            onValueChange={handleChange}
          />
        ),
      }
    })
  }, [sliderValue, handleChange])

  return (
    <div className={styles.formSliderContainer}>
      <Slider
        value={sliderValue}
        minValue={0}
        maxValue={100}
        className={styles.sliderWrapper}
        color="primary"
        onChange={handleChange}
        size="sm"
        classNames={{
          endContent: styles.sliderEndContent,
        }}
        endContent={markElements.map(mark => mark.trackMark)}
        showTooltip
      />
      <div className={styles.markLabelsContainer}>{markElements.map(mark => mark.markLabel)}</div>
    </div>
  )
}

function SliderTrackMarkLabel({
  value,
  offset,
  isActive,
  onValueChange,
}: {
  value: number
  offset: string
  isActive: boolean
  onValueChange: (value: number) => void
}) {
  const align = useMemo(() => {
    if (value === 0)
      return styles.markLabelAlignStart
    if (value === 100)
      return styles.markLabelAlignEnd
    return styles.markLabelAlignCenter
  }, [value])

  if (value === 0)
    offset = '0%'
  else if (value === 100)
    offset = '100%'

  return (
    <div
      className={clsx(
        styles.markLabelBase,
        align,
        isActive ? styles.markLabelActive : styles.markLabelInactive,
      )}
      style={{ left: offset }}
    >
      <div className={styles.markLabelText} onClick={() => onValueChange(value)}>
        {value}%
      </div>
    </div>
  )
}

function SliderTrackMark({ passed, offset }: { passed: boolean; offset: string }) {
  return (
    <div className={styles.trackMarkContainer} style={{ left: offset }}>
      <div
        className={clsx(
          styles.trackMarkDot,
          passed ? styles.trackMarkDotPassed : styles.trackMarkDotNotPassed,
        )}
      />
    </div>
  )
}
