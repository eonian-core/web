import FadeInChildList from '../../../components/fade-in/fade-in-child-list'
import styles from './offer.module.scss'
import { PropsWithChildren } from 'react'

export default function Tokens({children}: PropsWithChildren) {
  return (
    <div className={styles.tokens} >
      <FadeInChildList initialDelay={0.5}>
        {children}
      </FadeInChildList>
    </div>
  )
}
