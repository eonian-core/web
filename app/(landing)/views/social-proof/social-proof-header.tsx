import React from 'react';
import styles from './social-proof.module.scss';

interface socialProofHeaderProps {
  children: React.ReactNode;
}

const SocialProofHeader: React.FC<socialProofHeaderProps> = ({ children }) => {
  return (
    <div className={`${styles.socialProofHeader}`}>
      {children}
    </div>
  );
};

export default SocialProofHeader;