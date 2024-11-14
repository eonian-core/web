import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { WrapperLink } from '../links/wrapper-link'
import styles from './award-text.module.scss'
import IconLaurelWreath from '@/components/icons/laurel-wreath'

export interface AwardTextProps extends PropsWithChildren {
  href: string
  isSmall: boolean
}

export function AwardText({ children, href, isSmall }: AwardTextProps) {
  const classNames = clsx(styles.container, { [styles.small]: isSmall })
  return (
    <WrapperLink href={href} className={classNames}>
      <IconLaurelWreath className={styles.wreath} />
      <div className={styles.content}>
        {children}
      </div>
      <IconLaurelWreath className={clsx(styles.wreath, styles.mirror)} />
    </WrapperLink>
  )
}

export function AwardNumber({ children }: PropsWithChildren) {
  return (
    <span className={styles.number}>
      {children}
    </span>
  )
}
