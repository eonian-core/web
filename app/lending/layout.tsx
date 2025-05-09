import React from 'react'
import type { Metadata } from 'next'

import { overrideMetadata } from '../meta'
import styles from './layout.module.scss'

export default function LendingLayout({ children }: React.PropsWithChildren) {
  return <main className={styles.main}>{children}</main>
}

export const metadata: Metadata = overrideMetadata('Lending', 'Eonain Lending Application')
