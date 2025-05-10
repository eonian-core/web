import { Slider, cn } from '@heroui/react'
import { useCallback, useMemo } from 'react'
import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import { useAvailableBalanceByTab } from '../../hooks/useAvailableBalanceByTab'

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
    <div className="px-3">
      <Slider
        value={sliderValue}
        minValue={0}
        maxValue={100}
        className="max-w-md"
        color="primary"
        onChange={handleChange}
        size="sm"
        classNames={{
          endContent: 'absolute left-0 top-0 h-full w-full -z-20',
        }}
        endContent={markElements.map(mark => mark.trackMark)}
        showTooltip
      />
      <div className="w-full relative">{markElements.map(mark => mark.markLabel)}</div>
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
      return 'justify-start'
    if (value === 100)
      return 'justify-end'
    return 'justify-center'
  }, [value])

  if (value === 0)
    offset = '0%'
  else if (value === 100)
    offset = '100%'

  return (
    <div
      className={cn(
        'absolute w-0 text-sm flex items-center justify-end cursor-pointer',
        align,
        isActive ? 'text-foreground-200' : 'text-foreground-700',
      )}
      style={{ left: offset }}
    >
      <div className="hover:text-foreground-200" onClick={() => onValueChange(value)}>
        {value}%
      </div>
    </div>
  )
}

function SliderTrackMark({ passed, offset }: { passed: boolean; offset: string }) {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-0 flex items-center justify-center" style={{ left: offset }}>
      <div
        className={cn(
          'min-w-[8px] min-h-[8px] w-[8px] h-[8px] rounded-full',
          passed ? 'bg-[hsl(var(--heroui-primary))]' : 'bg-[hsl(var(--heroui-default-300)/0.5)]',
        )}
      />
    </div>
  )
}
