'use client'

import React from 'react'
import { useNotifyTokenContext } from '@/views/notify-token-drawer/notify-token-drawer'
import styles from '@/earn/components/notify-token-button.module.scss'

export function NotifyTokenButton() {
  const { open } = useNotifyTokenContext()
  return <div className={styles.notifyToken}>
    <button className={styles.button} onClick={open}>
      More cryptocurrencies
    </button>
  </div>
}
