import styles from './form-button.module.scss'
import type { ButtonProps } from '@/components/button/button'
import Button from '@/components/button/button'

/** Minimal logic, will be used in skeleton */
export function FormButtonBody(props: ButtonProps) {
  return (
    <div className={styles.wrapper}>
      <Button
        lightGradient
        slightlyRound
        size="lg"
        {...props}
        />
    </div>
  )
}
