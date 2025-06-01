import type { ReactNode } from 'react'
import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import type { FormData } from '../../LendingState'
import { useLendingState } from '../../LendingState'
import { formatAPY } from '../../web3/utils'
import { DifferentiatePercentWithColor } from '../misc/DifferentiatePercentWithColor'
import { usePreviewValues } from './usePreviewValues'
import styles from './FormPreview.module.scss'

interface Props {
  formData: FormData
  inputData: NumberInputValue
}

export function FormPreview({ formData, inputData }: Props) {
  const { userStatistics } = useLendingState()
  const previewValues = usePreviewValues(inputData, formData)
  const hasValue = inputData.value !== 0n && inputData.value !== undefined
  return (
    <div className={styles.formPreview}>
      <PreviewItem
        label="Borrow Capacity Used"
        newValue={
          hasValue ? <DifferentiatePercentWithColor value={previewValues.borrowCapacityUsed} template="borrow-capacity-used" /> : undefined
        }
      >
        <DifferentiatePercentWithColor value={userStatistics.borrowCapacityUsed} template="borrow-capacity-used" />
      </PreviewItem>
      <PreviewItem
        label="Net APY"
        newValue={hasValue ? formatAPY(previewValues.netAPY) : undefined}
      >
        <span className={styles.previewItemValue}>{userStatistics.displayValues.netAPY}</span>
      </PreviewItem>
    </div>
  )
}

function PreviewItem({ label, children, newValue }: { label: string; children: ReactNode; newValue?: ReactNode }) {
  return (
    <div className={styles.previewItem}>
      <span className={styles.previewItemLabel}>{label}</span>
      <div className={styles.previewItemValueDisplay}>
        <span className={styles.previewItemValue}>{children}</span>
        {newValue && (
          <>
            <span className={styles.previewItemArrow}>→</span>
            <span className={styles.previewItemNewValue}>{newValue}</span>
          </>
        )}
      </div>
    </div>
  )
}
