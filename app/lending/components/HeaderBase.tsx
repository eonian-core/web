import styles from './Header.module.scss'
import { H2, H3 } from '@/components/heading/heading'

export function HeaderBase({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div>
        <H2>Supply to Borrow</H2>
        <H3>Supply collateral to earn yield and borrow against it</H3>
      </div>
      {children}
    </div>
  )
}
