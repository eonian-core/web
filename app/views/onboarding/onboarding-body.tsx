import clsx from 'clsx'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import styles from './onboarding.module.scss'
import { OnboardingIcon } from './onboarding-icon'
import Button from '@/components/button/button'
import { WrapperLink } from '@/components/links/wrapper-link'

export enum OnboardingStep {
  Unkown = 'Unkown',
  AssetChosen = 'Asset Chosen',
  AmountEntered = 'Amount Entered',
  WalletConnected = 'Wallet Connected',
  TramsactionsApproved = 'Tramsactions Approved',
  EmailLinked = 'Email Linked',
}

export const ONBOARDING_STEPS_ORDER = [
  OnboardingStep.AssetChosen,
  OnboardingStep.AmountEntered,
  OnboardingStep.WalletConnected,
  OnboardingStep.TramsactionsApproved,
  OnboardingStep.EmailLinked,
]

export interface OnboardingBodyProps {
  completed: Array<OnboardingStep>
  placeholder?: string
  linkEmail: () => void
  show?: boolean
  showHeader?: boolean
  withBackground?: boolean
}

export function OnboardingBody({ completed, placeholder, linkEmail, show, showHeader, withBackground }: OnboardingBodyProps) {
  const active = useActiveStep(completed)

  const havePlaceholder = placeholder?.slice(0, 2) !== '0 '
  return <div className={clsx(styles.body, {
    [styles.show]: show,
    [styles.withBackground]: withBackground,
  })}>
        {showHeader && <h3>Onboarding</h3>}
        <div className={styles.list}>
            <ul>
                <OnboardingItem
                    currentStep={OnboardingStep.AssetChosen}
                    title="Chose Cryptocurrency"
                    {...{ active, completed }}
                >
                    <p>Choose the cryptocurrency you want to invest in</p>
                </OnboardingItem>

                <OnboardingItem
                    currentStep={OnboardingStep.AmountEntered}
                    title="Enter Amount"
                    {...{ active, completed }}
                >
                    <p>Choose how much do you want to save in vault and insure.{havePlaceholder ? ` For example, ${placeholder}.` : ''}</p>
                </OnboardingItem>

                <OnboardingItem
                    currentStep={OnboardingStep.WalletConnected}
                    title="Connect Wallet"
                    {...{ active, completed }}
                >
                    <p>Securely connect your crypto wallet to interact with blockchain.</p>
                    <OnboadingActions>
                        <WrapperLink withIcon href="https://ethereum.org/en/wallets/find-wallet/#main-content">Get Wallet</WrapperLink>
                    </OnboadingActions>
                </OnboardingItem>

                <OnboardingItem
                    currentStep={OnboardingStep.TramsactionsApproved}
                    title="Approve Transactions"
                    {...{ active, completed }}
                >
                    <p>Sign allowance and deposit transactions. Two-step deposit process ensure security of assets.</p>
                </OnboardingItem>

                <OnboardingItem
                    currentStep={OnboardingStep.EmailLinked}
                    title="Link Recovery Email"
                    {...{ active, completed }}
                >
                    <p>Connect your email to savings account to be able to recover them in case of your wallet hack.</p>

                    <OnboadingActions>
                        <Button bordered round size="sm" onClick={linkEmail}>Link email</Button>
                        <WrapperLink withIcon href="https://docs.eonian.finance/basics/how-eonian-works">How It Works</WrapperLink>
                    </OnboadingActions>
                </OnboardingItem>
            </ul>
        </div>
    </div>
}

export function useActiveStep(completed: Array<OnboardingStep>): OnboardingStep {
  return useMemo(() => calcActiveStep(completed), [completed])
}

export function calcActiveStep(completed: Array<OnboardingStep>): OnboardingStep {
  const completdSet = new Set(completed)

  for (const step of ONBOARDING_STEPS_ORDER) {
    if (!completdSet.has(step))
      return step
  }

  return ONBOARDING_STEPS_ORDER[0]
}

export interface OnboardingItemProps {
  currentStep: OnboardingStep
  children: ReactNode
  title: string
  active: OnboardingStep
  completed: Array<OnboardingStep>
}

function OnboardingItem({ currentStep, children, title, completed, active }: OnboardingItemProps) {
  const currentStepCompleted = completed.includes(currentStep)
  const currentStepActive = currentStep === active
  return (
        <li className={clsx(styles.item, {
          [styles.completed]: currentStepCompleted,
          [styles.active]: currentStepActive && !currentStepCompleted,
        })}>
            <div className={styles.icon}>
                <OnboardingIcon completed={currentStepCompleted} active={currentStepActive}>{currentStep}</OnboardingIcon>
                <div className={styles.line}></div>
            </div>

            <div className={styles.itemContent}>
                <h4>{title}</h4>
                <div className={styles.itemDescription}>
                    {children}
                </div>
            </div>
        </li>
  )
}

export function OnboadingActions({ children }: { children: ReactNode }) {
  return <div className={styles.actions}>
        {children}
    </div>
}
