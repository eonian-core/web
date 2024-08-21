import clsx from 'clsx'
import { FormSkeleton } from '../form/form-skeleton'
import styles from './content.module.scss'

export function ContentSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.onboardingBar, styles.placeholder)}></div>
      <div className={styles.container}>
        <section className={styles.middle}>
            <FormSkeleton />
        </section>
      </div>
    </div>
  )
}
