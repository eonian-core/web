import styles from './content.module.scss'
import { FormSkeleton } from './form/form-skeleton'

export function ContentSkeleton() {
  return (
    <div className={styles.container}>
      <section className={styles.middle}>
          <FormSkeleton />
      </section>
    </div>
  )
}
