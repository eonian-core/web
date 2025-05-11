import styles from './raw-form-input.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  preview?: boolean
  children: any
  label: string
  inputStart?: React.ReactNode
  headerEnd?: React.ReactNode
  price: React.ReactNode
}

/** Minimal logic, will be displayed in skeleton */
export function RawFormInput({ label, preview, children: value, inputStart, headerEnd, price, ...restProps }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{label}</h3>
        {headerEnd}
      </div>
      <div className={styles.content}>
        <div className={styles.inputStart}>{inputStart}</div>
        {preview
          ? (
            <div className={styles.input} {...restProps}>
              {value}
            </div>
            )
          : (
            <input className={styles.input} value={value as string} autoComplete="off" {...restProps} />
            )}

        <div className={styles.description}>{price}</div>
      </div>
    </div>
  )
}
