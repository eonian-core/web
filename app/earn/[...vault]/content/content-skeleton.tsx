import { FormSkeleton } from '../form/form-skeleton'
import styles from './content.module.scss'

export function ContentSkeleton() {
  return (
    <div className={styles.container}>
      <section className={styles.middle}>
          <FormSkeleton />
      </section>
    </div>
  )
}
