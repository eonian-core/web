import React from 'react'
import styles from './social-proof.module.scss'
import Container from '../../../components/contrainer/container'

export interface SocialProofProps {
  children: React.ReactNode
}

export default function SocialProof({ children }: SocialProofProps) {
  return (
    <div className={styles.socialProof}>
      <Container className={styles.container}>
        {children}
      </Container>
    </div>
  )
}