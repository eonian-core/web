'use client'

import React from 'react'
import styles from './suggest-token-button.module.scss'
import { useSuggestTokenContext } from '@/views/suggest-token-drawer/suggest-token-drawer'

export function SuggestTokenButton() {
  const { open } = useSuggestTokenContext()
  return <div className={styles.suggestToken}>
    <button className={styles.button} onClick={open}>
      More Cryptocurrencies
    </button>
  </div>
}
