import clsx from 'clsx'
import styles from './portfolio-legend.module.scss'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'

interface Props {
  proportion: number
  className?: string
}

export function PortfolioLegend({ proportion, className }: Props) {
  const { status: walletStatus } = useWalletWrapperContext()

  const vault = Math.max(Math.round(proportion * 100), 0)
  const wallet = 100 - vault

  const classNames = clsx(styles.container, className)
  return (
    <ul className={classNames}>
      <li className={styles.wallet}>
        <span className={styles.label}>Wallet</span>
        <WalletValue {...{ walletStatus }}>{wallet}</WalletValue>
      </li>
      <li className={styles.vault}>
        <span className={styles.label}>Savings Account</span>
        <span className={styles.value}>{vault}</span>
      </li>
      <li className={styles.coverage}>
        <span className={styles.label}>Insurance Coverage</span>
        <span className={styles.value}>{vault}</span>
      </li>
    </ul>
  )
}

interface WalletValueProps {
  children?: string | number
  walletStatus: WalletStatus
}

function WalletValue({ children: wallet, walletStatus }: WalletValueProps) {
  if (walletStatus !== WalletStatus.CONNECTED)
    return <span className={styles.notConnected}>Not connected</span>

  return <span className={styles.value}>{wallet}</span>
}
