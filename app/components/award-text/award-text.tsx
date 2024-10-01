import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './award-text.module.scss'
import IconLaurelWreath from '@/components/icons/laurel-wreath'

export function AwardText({ children }: PropsWithChildren) {
  return (
        <div className={styles.container}>
            <IconLaurelWreath className={styles.wreath} />
            <div className={styles.content}>
                {children}
            </div>
            <IconLaurelWreath className={clsx(styles.wreath, styles.mirror)} />
        </div>
  )
}

export function AwardNumber({ children }: PropsWithChildren) {
  return (
        <span className={styles.number}>
            {children}
        </span>
  )
}
