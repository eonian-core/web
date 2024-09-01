import styles from './content.module.scss'
import { FormSection } from './form-section'
import { LimitBlocks, SafetyBlocks } from './info-blocks'
import { LeftSection } from './left-section'
import { RightSection } from './right-section'
import { HorizontalOnboardingBar, VerticalOnboardingBar } from './onboarding-bar'
import type { TokenSymbol } from '@/types'

interface Props {
  symbol: TokenSymbol
}

export function Content({ symbol }: Props) {
  return (
    <>
      <div className={styles.wrapper}>
        <HorizontalOnboardingBar />

        <div className={styles.container}>
          <VerticalOnboardingBar />

          <LeftSection />

          <FormSection />

          <RightSection symbol={symbol} />
        </div>
      </div>
      <div className={styles.mobileInfoBlocks}>
        <SafetyBlocks show />
        <LimitBlocks show />
      </div>
    </>
  )
}
