import styles from './IconCell.module.scss'

interface Props {
  icon: React.ReactNode
  name: string
  symbol: string
}

export function IconCell({ icon, name, symbol }: Props) {
  return (
    <td className={styles.cell}>
      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.content}>
          <span className={styles.name}>{name}</span>
          <span className={styles.symbol}>{symbol}</span>
        </div>
      </div>
    </td>
  )
}
