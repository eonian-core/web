import styles from './web3-onboard-container.module.scss'
import { isOnServer } from '@/components/resize-hooks/isOnServer'

export const connectModalID = 'connect-modal'

const Web3OnboardContainer: React.FC = () => {
  return <div id={connectModalID} className={styles.container}></div>
}

export default Web3OnboardContainer
