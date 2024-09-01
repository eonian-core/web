'use client'

import { useHover } from '@uidotdev/usehooks'
import Form from '../form/form'
import styles from './content.module.scss'
import { LimitBlocks } from './info-blocks'

export function FormSection() {
  const [formRef, formHovering] = useHover()
  return (
    <section ref={formRef} className={styles.middle}>
      <Form />
      <LimitBlocks show={formHovering} />
    </section>
  )
}
