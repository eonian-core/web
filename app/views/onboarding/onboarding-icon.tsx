import clsx from 'clsx'
import { OnboardingStep } from './onboarding-body'
import styles from './onboarding-icon.module.scss'
import IconPencil from '@/components/icons/icon-pencil'
import IconWallet from '@/components/icons/icon-wallet'
import IconKey from '@/components/icons/icon-key'
import IconEmail from '@/components/icons/icon-email'
import IconCheck from '@/components/icons/icon-check'
import IconCoinAbstract from '@/components/icons/icon-coin-abstract'

export interface OnboardingIconProps {
  completed?: boolean
  active?: boolean
  children: OnboardingStep
}

export function OnboardingIcon({ active, ...props }: OnboardingIconProps) {
  return (
    <div className={clsx(styles.wrapper, {
      [styles.active]: active && !props.completed,
      [styles.completed]: props.completed,
    })}>
      <OnboardingIconBody {...props}/>
    </div>
  )
}

export function OnboardingIconBody({ children: step, completed }: OnboardingIconProps) {
  if (completed)
    return <IconCheck />

  if (step === OnboardingStep.AssetChosen)
    return <IconCoinAbstract />

  if (step === OnboardingStep.AmountEntered)
    return <IconPencil />

  if (step === OnboardingStep.WalletConnected)
    return <IconWallet />

  if (step === OnboardingStep.TramsactionsApproved)
    return <IconKey />

  if (step === OnboardingStep.EmailLinked)
    return <IconEmail />

  return null
}
