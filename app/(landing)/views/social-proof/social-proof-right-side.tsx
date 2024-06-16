import React from 'react';
import styles from './social-proof.module.scss';

interface SocialProofRightSideProps {
  children: React.ReactNode;
}

const SocialProofRightSide: React.FC<SocialProofRightSideProps> = ({ children }) => {
  return (
    <div className={`${styles.socialProofRightSide}`}>
      {children}
    </div>
  );
};

export default SocialProofRightSide;
