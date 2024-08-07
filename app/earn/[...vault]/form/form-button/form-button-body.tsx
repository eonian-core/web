import type { ButtonProps } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import styles from './form-button.module.scss'

/** Minimal logic, will be used in skeleton */
export function FormButtonBody(props: ButtonProps) {
  return (
    <div className={styles.wrapper}>
      <Button
        auto
        color="primary"
        size="lg"
        className={styles.button}
        {...props}
        />
  </div>
  )
}
