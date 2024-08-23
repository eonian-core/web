'use client'

import { useHover } from '@uidotdev/usehooks'
import clsx from 'clsx'
import { useDisclosure } from '@mantine/hooks'
import Form from '../form/form'
import { useVaultContext } from '../hooks/use-vault-context'
import { Portfolio } from '../portfolio/portfolio'
import { Returns } from '../returns/returns'
import { InsuranceOfAssets } from '../info-blocks/insurance-of-assets'
import { AssetSafety } from '../info-blocks/asset-safety'
import { ProtocolInsurance } from '../info-blocks/protocol-insurance'
import { WalletInsurance } from '../info-blocks/wallet-insurance'
import { Fees } from '../info-blocks/fees'
import { WithdrawLimits } from '../info-blocks/withdraw-limits'
import { VaultToken } from '../info-blocks/vault-token'
import styles from './content.module.scss'
import type { TokenSymbol } from '@/types'
import { useHideAnimtion } from '@/components/fade-in/animation'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { WalletLinkingProvider } from '@/views/wallet-linking-drawer/wallet-linking-drawer'
import { Onboading } from '@/views/onboarding/onboarding'
import { useIsUltraWideOrSmaller } from '@/components/resize-hooks/screens'
import { OnboardingDrawer } from '@/views/onboarding/onboarding-drawer'

interface Props {
  symbol: TokenSymbol
}

export function Content({ symbol }: Props) {
  const [formRef, formHovering] = useHover()
  const isUltraWideOrSmaller = useIsUltraWideOrSmaller()

  return (
    <WalletLinkingProvider>
      <div className={styles.wrapper}>
        <HorizontalOnboardingBar showPlaceholder={!isUltraWideOrSmaller} />

        <div className={styles.container}>
          {/** For undefined value, not display to avoid render during ssr */}
          {isUltraWideOrSmaller === false && <VerticalOnboardingBar />}

          <LeftSection />

          <section ref={formRef} className={styles.middle}>
            <Form />
            <LimitBlocks show={formHovering} />
          </section>

          <RightSection symbol={symbol} />
        </div>
      </div>
      <div className={styles.mobileInfoBlocks}>
        <SafetyBlocks show />
        <LimitBlocks show />
      </div>
    </WalletLinkingProvider>
  )
}

function useHaveWhatToDisplay() {
  const { inputValue = 0n, showPlaceholder, placeholderValue } = useVaultContext()
  const { status } = useWalletWrapperContext()
  if (inputValue !== 0n || status === WalletStatus.CONNECTED)
    return true

  return showPlaceholder && placeholderValue !== 0n
}

function VerticalOnboardingBar() {
  return (
    <div className={clsx(styles.onboardingBar, styles.vertical)}>
      <Onboading withBackground />
    </div>
  )
}

function HorizontalOnboardingBar({ showPlaceholder }: { showPlaceholder?: boolean }) {
  const [opened, { open, close }] = useDisclosure(false)

  if (showPlaceholder)
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

function LeftSection() {
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

function RightSection({ symbol }: { symbol: TokenSymbol }) {
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

function SafetyBlocks({ show }: { show: boolean }) {
  const hide = useHideAnimtion(show, 200)
  return (
    <div
      className={clsx(styles.infoBlocks, {
        [styles.show]: show,
        [styles.hide]: hide,
      })}
    >
      <AssetSafety />
      <ProtocolInsurance />
      <WalletInsurance />
    </div>
  )
}

function LimitBlocks({ show }: { show: boolean }) {
  const hide = useHideAnimtion(show, 200)
  return (
    <div
      className={clsx(styles.infoBlocks, {
        [styles.show]: show,
        [styles.hide]: hide,
      })}
    >
      <Fees />
      <WithdrawLimits />
      <VaultToken />
    </div>
  )
}
