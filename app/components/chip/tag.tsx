import { Chip } from '@heroui/react'
import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './tag.module.scss'

export interface TagProps extends PropsWithChildren {
  className?: string
}

// TODO: merge with our chip and remove dublicated code
export function Tag({ children, className }: TagProps) {
  return <Chip variant="bordered" size="sm" className={clsx(styles.tag, className)}>
    {children}
  </Chip>
}
