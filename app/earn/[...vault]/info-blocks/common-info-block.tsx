import type { PropsWithChildren } from 'react'
import React from 'react'

import { SectionHeader } from '../components/section-header/section-header'
import styles from './common-info-block.module.scss'

export function CommonInfoBlock({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export function InfoBlockTitle({ children }: PropsWithChildren) {
  return <SectionHeader title={children} className={styles.header} />
}

export function InfoBlockDescription({ children }: PropsWithChildren) {
  return <div className={styles.description}>{children}</div>
}

export function InfoBlockList({ children }: PropsWithChildren) {
  return <ul>{children}</ul>
}

export function InfoItem({ children }: PropsWithChildren) {
  return <li>{children}</li>
}

export function InfoItemIcon({ children }: PropsWithChildren) {
  return <div className={styles.icon}>{children}</div>
}

export function InfoItemTitle({ children }: PropsWithChildren) {
  return <div className={styles.title}>{children}</div>
}

export function InfoItemValue({ children }: PropsWithChildren) {
  return <div className={styles.value}>{children}</div>
}
