import styles from './InlineHighlighter.module.scss'

export default function InlineHighlighter({ children }: React.PropsWithChildren) {
  return <span className={styles.container}>{children}</span>
}
