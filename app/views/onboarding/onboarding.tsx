import { useCallback, useMemo } from 'react'
import { useWalletLinkingContext } from '../wallet-linking-drawer/wallet-linking-drawer'

import type { OnboardingBodyProps } from './onboarding-body'
import { ONBOARDING_STEPS_ORDER, OnboardingBody, OnboardingStep } from './onboarding-body'
import { OnboardingHorizontal } from './onboarding-horizontal'
import { useVaultContext } from '@/earn/[...vault]/hooks/use-vault-context'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useAppSelector } from '@/store/hooks'
import { useCurrentWalletLinkPreview } from '@/api/wallet-linking/wallet/use-wallet-link'

// expect that Onboarding is shown only on vault page
const DEFAULT_INITIAL_STEPS = [OnboardingStep.AssetChosen]

export interface OnboardingProps extends Omit<OnboardingBodyProps, 'completed' | 'placeholder' | 'linkEmail'> {
  initialSteps?: Array<OnboardingStep>
  horizontal?: boolean
  onButtonClick?: () => void
}

export function Onboading({ initialSteps, horizontal, onButtonClick, ...props }: OnboardingProps) {
  const { inputValue, placeholderDisplayValue, vault } = useVaultContext()
  const { wallet, chain, status } = useWalletWrapperContext()
  const { vaultBalanceBN } = useAppSelector(state => state.vaultUser)

  const { data } = useCurrentWalletLinkPreview(wallet?.address, chain?.id, status)
  const completed = useCompletedSteps({
    inputValue,
    walletStatus: status,
    initialSteps: initialSteps || DEFAULT_INITIAL_STEPS,
    vaultBalanceBN,
    isLinked: !!data?.getWalletPreview?.link,
  })

  const { open } = useWalletLinkingContext()

  const openLinkEmailDrawer = useCallback(() => {
    onButtonClick?.()
    open()
  }, [open, onButtonClick])

  const onboardingFinished = completed.length === ONBOARDING_STEPS_ORDER.length
  if (onboardingFinished)
    return null

  if (horizontal)
    return <OnboardingHorizontal {...{ completed }} />

  return (<OnboardingBody
        completed={completed}
        placeholder={`${placeholderDisplayValue} ${vault?.asset.symbol}`}
        linkEmail={openLinkEmailDrawer}
        {...props}
    />)
}

export interface CalcCompletedStepsOptions {
  inputValue?: bigint
  initialSteps?: Array<OnboardingStep>
  walletStatus: WalletStatus
  vaultBalanceBN: string
  isLinked?: boolean
}

function useCompletedSteps({
  inputValue,
  walletStatus,
  vaultBalanceBN,
  isLinked,
  initialSteps = [],
}: CalcCompletedStepsOptions) {
  return useMemo(() =>
    [...calcCompletedSteps({ inputValue, walletStatus, vaultBalanceBN, isLinked, initialSteps })],
  [inputValue, walletStatus, vaultBalanceBN, isLinked, initialSteps],
  )
}

function* calcCompletedSteps({ inputValue, walletStatus, vaultBalanceBN, isLinked, initialSteps = [] }: CalcCompletedStepsOptions) {
  yield * initialSteps

  const haveBalanceInVault = BigInt(vaultBalanceBN) > 0n

  if (inputValue || haveBalanceInVault)
    yield OnboardingStep.AmountEntered

  if (walletStatus === WalletStatus.CONNECTED)
    yield OnboardingStep.WalletConnected

  if (haveBalanceInVault)
    yield OnboardingStep.TramsactionsApproved

  if (isLinked)
    yield OnboardingStep.EmailLinked
}
