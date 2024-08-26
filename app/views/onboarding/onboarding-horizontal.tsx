import clsx from 'clsx'
import type { OnboardingStep } from './onboarding-body'
import { ONBOARDING_STEPS_ORDER, useActiveStep } from './onboarding-body'
import styles from './onboarding-horizontal.module.scss'
import { OnboardingIcon } from './onboarding-icon'

export interface OnboardingHorizontalProps {
  completed: Array<OnboardingStep>
}

export function OnboardingHorizontal({ completed }: OnboardingHorizontalProps) {
  const active = useActiveStep(completed)

  return (
        <div className={styles.horizontal}>
            <ul>
                {ONBOARDING_STEPS_ORDER.map((step, index) => (
                    <OnboardingItem
                        key={step}
                        currentStep={step}
                        last={index === ONBOARDING_STEPS_ORDER.length - 1}
                        {...{ active, completed }}
                    />
                ))}
            </ul>
        </div>
  )
}

export interface OnboardingItemProps {
  currentStep: OnboardingStep
  active: OnboardingStep
  completed: Array<OnboardingStep>
  last?: boolean
}

function OnboardingItem({ currentStep, active, completed, last }: OnboardingItemProps) {
  const currentStepCompleted = completed.includes(currentStep)
  const currentStepActive = currentStep === active
  return (
        <li className={clsx(styles.item, {
          [styles.completed]: currentStepCompleted,
          [styles.active]: currentStepActive && !currentStepCompleted,
        })}>
            <div>
                <OnboardingIcon completed={currentStepCompleted} active={currentStepActive}>{currentStep}</OnboardingIcon>
            </div>
            {!last && <div className={styles.line}></div>}
        </li>
  )
}
