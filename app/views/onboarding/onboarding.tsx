import clsx from 'clsx'
import { type ReactNode, useMemo } from 'react'
import { useWalletLinkingContext } from '../wallet-linking-drawer/wallet-linking-drawer'
import styles from './onboarding.module.scss'
import Button from '@/components/button/button'
import IconPencil from '@/components/icons/icon-pencil'
import IconWallet from '@/components/icons/icon-wallet'
import IconKey from '@/components/icons/icon-key'
import IconEmail from '@/components/icons/icon-email'
import IconCheck from '@/components/icons/icon-check'
import IconCoinAbstract from '@/components/icons/icon-coin-abstract'
import { WrapperLink } from '@/components/links/wrapper-link'
import { useVaultContext } from '@/earn/[...vault]/hooks/use-vault-context'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useAppSelector } from '@/store/hooks'
import { useCurrentWalletLinkPreview } from '@/api/wallet-linking/wallet/use-wallet-link'

export enum OnboardingStep {
  Unkown = 'Unkown',
  AssetChosen = 'Asset Chosen',
  AmountEntered = 'Amount Entered',
  WalletConnected = 'Wallet Connected',
  TramsactionsApproved = 'Tramsactions Approved',
  EmailLinked = 'Email Linked',
}

const stepsOrder = [
  OnboardingStep.AssetChosen,
  OnboardingStep.AmountEntered,
  OnboardingStep.WalletConnected,
  OnboardingStep.TramsactionsApproved,
  OnboardingStep.EmailLinked,
]

// expect that Onboarding is shown only on vault page
const DEFAULT_INITIAL_STEPS = [OnboardingStep.AssetChosen]

export interface OnboardingProps extends Omit<OnboardingBodyProps, 'completed' | 'placeholder' | 'linkEmail'> {
  initialSteps?: Array<OnboardingStep>
}

export function Onboading({ initialSteps, ...props }: OnboardingProps) {
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

  const onboardingFinished = completed.length === stepsOrder.length
  if (onboardingFinished)
    return null

  return (<OnboardingBody
        completed={completed}
        placeholder={`${placeholderDisplayValue} ${vault?.asset.symbol}`}
        linkEmail={open}
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
export interface OnboardingBodyProps {
  completed: Array<OnboardingStep>
  placeholder?: string
  linkEmail: () => void
  show?: boolean
  showHeader?: boolean
}

export function OnboardingBody({ completed, placeholder, linkEmail, show, showHeader }: OnboardingBodyProps) {
  const active = calcActiveStep(completed)

  const havePlaceholder = placeholder?.slice(0, 2) !== '0 '
  return <div className={clsx(styles.body, {
    [styles.show]: show,
  })}>
        {showHeader && <h3>Onboarding</h3>}
        <div className={styles.list}>
            <ul>
                <OnboardingItem
                    active={active === OnboardingStep.AssetChosen}
                    completed={completed.includes(OnboardingStep.AssetChosen)}
                    title="Chose Cryptocurrency"
                    icon={<IconCoinAbstract />}
                >
                    <p>Choose the cryptocurrency you want to invest in</p>
                </OnboardingItem>

                <OnboardingItem
                    active={active === OnboardingStep.AmountEntered}
                    completed={completed.includes(OnboardingStep.AmountEntered)}
                    title="Enter Amount"
                    icon={<IconPencil />}
                >
                    <p>Choose how much do you want to save in vault and insure.{havePlaceholder ? ` For example, ${placeholder}.` : ''}</p>
                </OnboardingItem>

                <OnboardingItem
                    active={active === OnboardingStep.WalletConnected}
                    completed={completed.includes(OnboardingStep.WalletConnected)}
                    title="Connect Wallet"
                    icon={<IconWallet />}
                >
                    <p>Securely connect your crypto wallet to interact with blockchain.</p>
                    <OnboadingActions>
                        <WrapperLink withIcon href="https://ethereum.org/en/wallets/find-wallet/#main-content">Get Wallet</WrapperLink>
                    </OnboadingActions>
                </OnboardingItem>

                <OnboardingItem
                    active={active === OnboardingStep.TramsactionsApproved}
                    completed={completed.includes(OnboardingStep.TramsactionsApproved)}
                    title="Approve Transactions"
                    icon={<IconKey />}
                >
                    <p>Sign allowance and deposit transactions. Two-step deposit process ensure security of assets.</p>
                </OnboardingItem>

                <OnboardingItem
                    active={active === OnboardingStep.EmailLinked}
                    completed={completed.includes(OnboardingStep.EmailLinked)}
                    title="Link Recovery Email"
                    icon={<IconEmail />}
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

function calcActiveStep(completed: Array<OnboardingStep>): OnboardingStep {
  const completdSet = new Set(completed)

  for (const step of stepsOrder) {
    if (!completdSet.has(step))
      return step
  }

  return stepsOrder[0]
}

export interface OnboardingItemProps {
  icon: ReactNode
  children: ReactNode
  title: string
  active: boolean
  completed: boolean
}

export function OnboardingItem({ children, icon, title, completed, active }: OnboardingItemProps) {
  return (
        <li className={clsx(styles.item, {
          [styles.completed]: completed,
          [styles.active]: active && !completed,
        })}>
            <div className={styles.icon}>
                <div className={styles.iconContent}>
                    {completed ? <IconCheck /> : icon}
                </div>
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
