'use client'

import { Spinner as LoadingIndicator } from '@nextui-org/react'

import styles from './layout.module.scss'

export default function Loading() {
  return (
    <div className={styles.loading}>
      <LoadingIndicator />
    </div>
  )
}
