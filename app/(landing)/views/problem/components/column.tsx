import React from 'react'
import styles from './column.module.scss'

interface ColumnProps {
  children: React.ReactNode
}

export const Column: React.FC<ColumnProps> = ({ children }) => {
  return (
    <div className={styles.column}>
      {children}
    </div>
  )
}
