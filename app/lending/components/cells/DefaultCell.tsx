import styles from './DefaultCell.module.scss'

interface Props {
  value: string
  subValue?: string
}

export function DefaultCell(props: Props) {
  return (
    <div className={styles.container}>
      <Content {...props} />
      <SubContent {...props} />
    </div>
  )
}

function Content({ value }: Props) {
  if (+value === 0)
    return <span className={styles.zeroContent}>0</span>

  return <span className={styles.content}>{value}</span>
}

function SubContent({ value, subValue }: Props) {
  if (!subValue)
    return null

  if (+value === 0)
    return null

  return <span className={styles.subContent}>{subValue}</span>
}
