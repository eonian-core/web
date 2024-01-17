import type { CSSProperties } from 'react'
import clsx from 'clsx'
import IconExternal from '../../../components/icons/icon-external'
import ExternalLink from '../../../components/links/external-link'

import styles from './InfoCard.module.scss'

const colors = [
  'hsla(270, 35%, 50%, 0.75)',
  'hsl(229, 80%, 66%, 0.75)',
  'hsl(229, 80%, 66%, 0.5)',
  'hsl(229, 80%, 66%, 0.5)',
]

interface Props {
  href: string
  color: number
  className?: string
}

export default function InfoCard({
  href,
  children,
  color,
  className,
  ...restProps
}: React.PropsWithChildren<Props>) {
  const nativeStyles = { '--color-shade': colors[color] } as CSSProperties
  return (
    <div
      className={clsx(className, styles.wrapper)}
      style={nativeStyles}
      {...restProps}
    >
      <div className={styles.container} >
        <div className={styles.radial}></div>
        
        <div className={styles.content}>
          <div className={styles.text}>
            {children}
          </div>
          
          <ExternalLink href={href} className="justify-self-end">
            Learn more <IconExternal />
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}
