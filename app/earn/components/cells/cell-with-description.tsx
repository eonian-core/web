import React from 'react'

import { Skeleton } from '@nextui-org/react'
import styles from './cell-with-description.module.scss'

interface Props {
  children: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  isLoading?: boolean
}

export const CellWithDescription: React.FC<Props> = ({ icon, children, description, isLoading }) => (
  <div className={styles.container}>
    {icon}
    <div className={styles.content}>
      <Skeleton isLoaded={!isLoading} className="rounded-lg">
        <div>{children}</div>
      </Skeleton>
      {description && (
        <Skeleton isLoaded={!isLoading} className="rounded-lg leading-5">
          <div className={styles.description}>{description}</div>
        </Skeleton>
      )}
    </div>
  </div>
)
