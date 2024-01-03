import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'
import { interFont } from '../../../../shared/fonts/Inter'
import styles from './Heading.module.scss'

type Tags = 'h2' | 'h3'

const defaultTag = 'h2'

interface Props<T extends Tags = defaultTag> extends HTMLMotionProps<T> {
  tag?: Tags
}

const tagToTextClasses: Record<Tags, string> = {
  h2: 'text-2xl laptop:text-4xl',
  h3: 'text-xl laptop:text-2xl',
}

export default function Heading<T>({
  children,
  className,
  tag = defaultTag,
  ...restProps
}: React.PropsWithChildren<Props<T>>) {
  const Component = motion[tag]
  return (
    <Component
      className={`${styles.heading} ${interFont.className} ${className} ${tagToTextClasses[tag]} font-bold text-foreground`}
      {...restProps}
    >
      {children}
    </Component>
  )
}
