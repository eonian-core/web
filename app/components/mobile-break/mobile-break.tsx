import React from 'react'
import clsx from 'clsx'
import styles from './mobile-break.module.scss'

export interface MbrProps {
  start?: 'laptop' | 'tablet' | 'mobile'
  children: React.ReactNode
}

/** Behaive like <br /> but only on mobile */
export default function Mbr({ children, start = 'tablet' }: MbrProps) {
  return <span className={clsx({
    [styles.mobileBreak]: start === 'mobile',
    [styles.tabletBreak]: start === 'tablet',
    [styles.laptopBreak]: start === 'laptop',
  })}>{children}</span>
}

//
