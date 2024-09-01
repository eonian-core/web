'use client'

import clsx from 'clsx'
import { useDisclosure } from '@mantine/hooks'
import styles from './onboarding-bar.module.scss'
import { Onboading } from '@/views/onboarding/onboarding'
import { OnboardingDrawer } from '@/views/onboarding/onboarding-drawer'
import { useIsUltraWideOrSmaller } from '@/components/resize-hooks/screens'

export function VerticalOnboardingBar() {
  return (
    <div className={clsx(styles.onboardingBar, styles.vertical)}>
      <Onboading withBackground />
    </div>
  )
}

export function HorizontalOnboardingBar() {
  const [opened, { open, close }] = useDisclosure(false)
  const isUltraWideOrSmaller = useIsUltraWideOrSmaller()

  if (!isUltraWideOrSmaller)
    return <div className={clsx(styles.onboardingBar, styles.placeholder)}></div>

  return (
    <>
      <OnboardingDrawer {...{ opened, onClose: close }} />

      <div className={clsx(styles.onboardingBar, styles.horizontal)} onClick={open}>
        <Onboading horizontal />
      </div>
    </>
  )
}
