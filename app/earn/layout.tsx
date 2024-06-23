import React from 'react'
import type { Metadata } from 'next'

import { overrideMetadata } from '../meta'
import {clsx} from 'clsx' // only for build test
import styles from './layout.module.scss'

export default function EarnLayout({ children }: React.PropsWithChildren) {
  return <main className={styles.main}>{children}</main>
}

export const metadata: Metadata = overrideMetadata('Earn', 'Eonain Earn Application')
