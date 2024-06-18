import React from 'react'
import styles from './social-proof.module.scss'

export interface SocialProofProps {
  children: React.ReactNode
}

export default function SocialProof({ children }: SocialProofProps) {
  return (
    <div className={styles.container}>
      <div className={styles.socialProof}>
        {children}
      </div>
    </div>
  )
}
