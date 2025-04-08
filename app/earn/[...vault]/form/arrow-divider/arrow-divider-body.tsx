import clsx from 'clsx'

import { Divider } from '@nextui-org/react'
import styles from './arrow-divider.module.scss'
import IconArrowRightShort from '@/components/icons/icon-arrow-right-short'

const size = 24

export interface ArrowDividerBodyProps {
  children?: React.ReactNode
  reverse?: boolean
  onClick?: () => void
}

/** Minimal logic, will be dispalyed in skeleton */
export function ArrowDividerBody({ children: picker, reverse, onClick }: ArrowDividerBodyProps) {
  return (
    <div className={clsx(styles.divider, { [styles.withPicker]: picker })}>
      {picker}
      <Divider />
      <div onClick={onClick} className={clsx(styles.arrow, 'bg-content1', {
        [styles.reverse]: reverse,
      })}>
        <IconArrowRightShort width={size} height={size} />
      </div>
    </div>
  )
}
