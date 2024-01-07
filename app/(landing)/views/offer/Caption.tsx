import Heading from '../sticky-problem/components/Heading'
import styles from './offer.module.scss'

export default function Caption() {
  return (
    <div className={styles.caption}>
      <Heading>
        Wallet + Insurance + <mark>Income</mark> = Eonian
      </Heading>
      
      <p>We combine the strengths of Exchanges and Wallets to fight their weaknesses.</p>
    </div>
  )
}
