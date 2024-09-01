import clsx from 'clsx'
import { Returns } from '../returns/returns'
import { useHaveWhatToDisplay } from './useHaveWhatToDisplay'
import styles from './content.module.scss'
import type { TokenSymbol } from '@/types'
import { useHideAnimtion } from '@/components/fade-in/animation'

export function RightSection({ symbol }: { symbol: TokenSymbol }) {
  const show = useHaveWhatToDisplay()
  const hide = useHideAnimtion(show, 200)

  return (
    <section
      className={clsx(styles.right, {
        [styles.show]: show,
        [styles.hide]: hide,
      })}
    >
      <Returns symbol={symbol} />
    </section>
  )
}
