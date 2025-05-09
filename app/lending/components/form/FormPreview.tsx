import type { ReactNode } from 'react'
import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import type { FormData } from '../../LendingState'
import { useLendingState } from '../../LendingState'
import { formatAPY } from '../../web3/utils'
import { DifferentiatePercentWithColor } from '../misc/DifferentiatePercentWithColor'
import { usePreviewValues } from './usePreviewValues'

interface Props {
  formData: FormData
  inputData: NumberInputValue
}

export function FormPreview({ formData, inputData }: Props) {
  const { userStatistics } = useLendingState()
  const previewValues = usePreviewValues(inputData, formData)
  const hasValue = inputData.value !== 0n && inputData.value !== undefined
  return (
    <div className="flex flex-col gap-1 mt-6 p-2 border border-[hsl(var(--heroui-default-700))] rounded-lg">
      <PreviewItem
        label="Borrow Capacity Used"
        value={<DifferentiatePercentWithColor value={userStatistics.borrowCapacityUsed} template="borrow-capacity-used" />}
        newValue={
          hasValue ? <DifferentiatePercentWithColor value={previewValues.borrowCapacityUsed} template="borrow-capacity-used" /> : undefined
        }
      />
      <PreviewItem
        label="Net APY"
        value={userStatistics.displayValues.netAPY}
        newValue={hasValue ? formatAPY(previewValues.netAPY) : undefined}
      />
    </div>
  )
}

function PreviewItem({ label, value, newValue }: { label: string; value: ReactNode; newValue?: ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-foreground-500">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-sm text-foreground-50">{value}</span>
        {newValue && (
          <>
            <span className="text-sm text-foreground-600">→</span>
            <span className="text-sm text-foreground-50">{newValue}</span>
          </>
        )}
      </div>
    </div>
  )
}
