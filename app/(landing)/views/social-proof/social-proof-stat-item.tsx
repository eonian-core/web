import React from 'react';
import styles from './social-proof.module.scss'
import { interFont } from '../../../shared/fonts/Inter';

interface StatItemProps {
  number: string;
  description: string;
  children?: React.ReactNode;
}

const SocialProofStatItem: React.FC<StatItemProps> = ({ number, description, children }) => {
  return (
    <div className={styles.statItem}>
      <div className={`${styles.number} ${interFont.className}`}>{number}</div>
      <div className={styles.description}>{description}</div>
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export default SocialProofStatItem;
