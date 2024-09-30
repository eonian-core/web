import type { PropsWithChildren } from 'react'
import styles from './audits.module.scss'
import IconShieldHeart from '@/components/icons/icon-shield-heart'
import IconShieldFillCheck from '@/components/icons/icon-shield-fill-check'
import IconShieldLockFill from '@/components/icons/icon-shield-lock-fill'

export function Audits({ children }: PropsWithChildren) {
  return (
        <div className={styles.audits}>
            {children}
        </div>
  )
}

export interface AuditsItemProps extends PropsWithChildren {
  type: 'heart' | 'check' | 'lock'
}

export function AuditsItem({ children, type }: AuditsItemProps) {
  return (
        <div className={styles.auditsItem}>
            {type === 'heart'
              ? (
                <IconShieldHeart />
                )
              : type === 'check'
                ? (
                <IconShieldFillCheck />
                  )
                : (
                <IconShieldLockFill />
                  )}
            {children}
        </div>
  )
}
