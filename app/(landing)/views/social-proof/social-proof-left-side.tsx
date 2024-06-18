import React from 'react'
import styles from './social-proof.module.scss'

interface SocialProofLeftSideProps {
  children: React.ReactNode
}

const SocialProofLeftSide: React.FC<SocialProofLeftSideProps> = ({ children }) => {
  return (
    <div className={`${styles.socialProofLeftSide}`}>
      {children}
    </div>
  )
}

export default SocialProofLeftSide
