import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'
import { interFont } from '../../../../shared/fonts/Inter'
import styles from './Heading.module.scss'

export default function Heading({ children, className, ...restProps }: React.PropsWithChildren<HTMLMotionProps<'h2'>>) {
  return (
    <motion.h2 className={`${styles.heading} ${interFont.className} ${className} font-bold text-foreground text-2xl laptop:text-4xl`} {...restProps}>
      {children}
    </motion.h2>
  )
}
