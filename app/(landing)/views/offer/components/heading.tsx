import { interFont } from '../../../../shared/fonts/Inter'
import styles from './heading.module.scss'

type Tags = 'h2' | 'h3'

const defaultTag = 'h2'

interface Props extends React.HTMLProps<HTMLHeadingElement> {
  tag?: Tags
}

export default function Heading({
  children,
  className,
  tag = defaultTag,
  ...restProps
}: React.PropsWithChildren<Props>) {
  const Component = tag
  return (
    <Component
      className={`${styles.heading} ${interFont.className} ${className} font-bold text-foreground`}
      {...restProps}
    >
      {children}
    </Component>
  )
}
