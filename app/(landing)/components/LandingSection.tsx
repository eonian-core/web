import clsx from 'clsx'

import styles from './LandingSection.module.scss'

export default function LandingSection({
  children,
  className,
  ...restProps
}: React.PropsWithChildren<React.HTMLProps<HTMLSelectElement>>) {
  return (
    <section className={clsx('h-screen py-32 max-w-[100rem] m-auto', styles.container)} {...restProps}>
      <div className={clsx(className, 'h-full')}>{children}</div>
    </section>
  )
}
