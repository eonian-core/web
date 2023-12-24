import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { MotionStyle } from 'framer-motion'
import IconExternal from '../../../components/icons/icon-external'
import ExternalLink from '../../../components/links/external-link'
import { interFont } from '../../../shared/fonts/Inter'

import styles from './InfoCard.module.scss'

const colors = [
  'hsla(270, 35%, 50%, 0.75)',
  'hsl(229, 80%, 66%, 0.75)',
  'hsl(229, 80%, 66%, 0.5)',
  'hsl(229, 80%, 66%, 0.5)',
]

interface Props {
  caption: string
  href: string
  color: number

  style: MotionStyle
}

export default function InfoCard({
  caption,
  href,
  children,
  color,
  style,
  ...restProps
}: React.PropsWithChildren<Props>) {
  const nativeStyles = { '--color-shade': colors[color] } as CSSProperties
  return (
    <motion.div
      className={`p-8 rounded-3xl relative overflow-hidden shadow-sm ${styles.container}`}
      style={{ ...style, ...nativeStyles }}
      {...restProps}
    >
      <div className={`z-0 absolute top-0 left-0 h-full w-full ${styles.radial}`}></div>
      <div className="z-10 relative h-full flex flex-col justify-between">
        <div>
          <h1 className={`text-7xl mb-6 ${interFont.className}`}>{caption}</h1>
          {children}
        </div>
        <ExternalLink href={href} className="justify-self-end">
          Learn more <IconExternal />
        </ExternalLink>
      </div>
    </motion.div>
  )
}
