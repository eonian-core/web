import type { PropsWithChildren } from 'react'

import styles from './join-others-wrapper.module.scss'

export function JoinOthersWrapper({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>
}
