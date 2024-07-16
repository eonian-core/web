import React from 'react'

import styles from './common-info-block.module.scss'

export interface InfoBlockItem {
  icon: React.ReactNode
  title: React.ReactNode
  value: React.ReactNode
}

interface Props {
  title: React.ReactNode
  items: InfoBlockItem[]
  description: React.ReactNode
}

export function CommonInfoBlock({ items, description }: Props) {
  return (
    <div className={styles.container}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.value}>{item.value}</div>
          </li>
        ))}
      </ul>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  )
}
