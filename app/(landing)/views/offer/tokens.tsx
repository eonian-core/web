import FadeInChildList from '../../../components/fade-in/fade-in-child-list'
import { Token } from './token'
import styles from './offer.module.scss'

export default function Tokens() {
  return (
    <div className={styles.tokens} >
      <FadeInChildList initialDelay={0.5}>
        <Token token="ETH" development>Ethereum Vault</Token>

        <Token token="BTC" development>Bitcoin Vault</Token>

        <Token token="USDT" development>Tether Vault</Token>
      </FadeInChildList>
    </div>
  )
}

