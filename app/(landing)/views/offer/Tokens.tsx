import FadeInChildList from '../../../components/fade-in/fade-in-child-list'
import { Token } from './Token'
import styles from './offer.module.scss'

export default function Tokens() {
  return (
    <div className={styles.tokens} >
      <FadeInChildList initialDelay={0.5}>
        <Token token="ETH" development>
          <h3>Ethereum Vault</h3>
        </Token>

        <Token token="BTC" development>
          <h3>Bitcoin Vault</h3>
        </Token>

        <Token token="USDT" development>
          <h3>Tether Vault</h3>
        </Token>
      </FadeInChildList>
    </div>
  )
}

