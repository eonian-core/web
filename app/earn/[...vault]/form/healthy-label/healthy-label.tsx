import type { PropsWithChildren } from 'react'
import styles from './healthy-label.module.scss'
import IconExternal from '@/components/icons/icon-external'
import ExternalLink from '@/components/links/external-link'

export function HealthyLabel({ children, showValue = false }: PropsWithChildren<{ showValue?: boolean }>) {
  return (
    <span className={styles.container}>
      {showValue
        ? children
        : (
        <ExternalLink href="/security" icon={<IconExternal size="0.75rem" />} iconAtEnd>
          Healthy
        </ExternalLink>
          )}
    </span>
  )
}
