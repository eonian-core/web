import styles from './UtilizationRateLine.module.scss'

interface Props {
  /**
   * The utilization rate as a decimal (0-1)
   */
  rate: number
}

export function UtilizationRateLine({ rate }: Props) {
  const safeRate = Math.max(0, Math.min(1, rate))
  const displayPercentage = Math.round(safeRate * 100)
  return (
    <div className={styles.utilizationRateLine}>
      <div className={styles.header}>
        <div className={styles.label}>Utilization Rate</div>
        <div className={styles.percentage}>{displayPercentage}%</div>
      </div>
      <div className={styles.track}>
        {/* Filled portion */}
        <div className={styles.filled} style={{ width: `${displayPercentage}%` }} />
        {/* Marker for current position */}
        <div
          className={styles.marker}
          style={{
            left: `calc(${displayPercentage}% - 0px)`,
            // width: '2px', // Handled by SCSS
            // height: '8px', // Handled by SCSS
            // transform: 'translateY(-2px)', // Handled by SCSS
          }}
        />
      </div>
    </div>
  )
}
