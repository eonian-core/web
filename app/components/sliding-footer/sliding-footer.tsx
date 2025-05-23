'use client'

import React from 'react'
import LandingOnlyRadial from '../footer-radial/footer-radial'
import { useOnResizeEffect } from '../resize-hooks/useOnResizeEffect'
import styles from './sliding-footer.module.scss'

interface SlidingFooterProps {
  children: React.ReactNode
  footer: React.ReactNode
}

// Optional: set a default value to prevent scroll bar jitter
const minFooterHeight = 476

const SlidingFooter: React.FC<SlidingFooterProps> = ({ children, footer }) => {
  const footerRef = React.useRef<HTMLDivElement>(null)

  const [margin, setMargin] = React.useState(minFooterHeight)

  // Set content's margin as footer's height
  useOnResizeEffect(() => {
    const { current: footer } = footerRef
    const margin = Math.max(footer?.offsetHeight ?? 0, minFooterHeight)
    setMargin(margin - 1) // Substract 1 to eliminate 1 pixel gap between footer and content container
  }, [])

  return (
    <>
      <div className={styles.content} style={{ marginBottom: `${margin}px` }} id="sliding-content">
        {children}

        <LandingOnlyRadial />
      </div>
      <div ref={footerRef} className={styles.footer} style={{ minHeight: `${minFooterHeight}px` }}>
        {footer}
      </div>
    </>
  )
}

export default SlidingFooter
