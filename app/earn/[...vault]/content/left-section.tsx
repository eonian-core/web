import clsx from 'clsx'
import { useHover } from '@uidotdev/usehooks'
import { InsuranceOfAssets } from '../info-blocks/insurance-of-assets'
import { Portfolio } from '../portfolio/portfolio'
import { SafetyBlocks } from './info-blocks'
import { useHaveWhatToDisplay } from './useHaveWhatToDisplay'
import styles from './content.module.scss'
import { useHideAnimtion } from '@/components/fade-in/animation'

export function LeftSection() {
  const [leftSectionRef, leftSectionHovering] = useHover()
  const show = useHaveWhatToDisplay()
  const hide = useHideAnimtion(show, 200)

  return (
    <section
      ref={leftSectionRef}
      className={clsx(styles.left, {
        [styles.show]: show,
        [styles.hide]: hide,
      })}
    >
      <Portfolio />
      <InsuranceOfAssets />
      <SafetyBlocks show={leftSectionHovering} />
    </section>
  )
}
