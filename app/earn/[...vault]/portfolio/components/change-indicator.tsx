import clsx from 'clsx'
import styles from './change-indicator.module.scss'
import IconBoxArrow from '@/components/icons/icon-box-arrow'

export function ChangeIndicator({ change }: { change: bigint }) {
  const className = clsx({
    [styles.positiveChange]: change > 0n,
    [styles.negativeChange]: change < 0n,
  })
  return (
    <span className={className}>
      <IconBoxArrow direction={change > 0 ? 'top' : 'bottom'} />
    </span>
  )
}
