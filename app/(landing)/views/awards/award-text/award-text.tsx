import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import awardStyles from '../awards.module.scss'
import styles from './award-text.module.scss'
import IconLaurelWreath from '@/components/icons/laurel-wreath'

export interface AwardTextProps extends PropsWithChildren {
  fullWidth?: boolean
}

export function AwardText({ children, fullWidth }: AwardTextProps) {
  return (
        <div className={clsx(styles.container, {
          [awardStyles.fullWidth]: fullWidth,
        })}>
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
