import React from 'react'
import Image from 'next/image'
import ImageCard from '../../../components/image-card/image-card'
import magnifierPic from './assets/magnifier.png'
import styles from './secops.module.scss'
import { useIsTabletOrSmallerOnClient } from '@/components/resize-hooks/useOnClientSize'

export interface SecOpsCodeReviewProps {
  /**
   * Children of card
   * expect one h3 header and one p element and Target component
   */
  children: React.ReactNode
}

export default function SecOpsCodeReview({ children }: SecOpsCodeReviewProps) {
  const isTabletOrSmaller = useIsTabletOrSmallerOnClient()

  return (
    <ImageCard
      href={'https://github.com/eonian-core/farm'}
      image={<Image src={magnifierPic} alt={'magnifier picture'} placeholder="blur" />}
      isVertical={isTabletOrSmaller === true}
      className={styles.secOpsImageCard}
    >
      {children}
    </ImageCard>
  )
}
