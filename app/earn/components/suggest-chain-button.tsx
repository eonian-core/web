'use client'

import React from 'react'
import styles from './suggest-chain-button.module.scss'
import { useSuggestChainContext } from '@/views/suggest-chain-drawer/suggest-chain-drawer'

export function SuggestChainButton() {
  const { open } = useSuggestChainContext()
  return <div className={styles.suggestChain}>
    <button className={styles.button} onClick={open}>
      More chains
    </button>
  </div>
}
