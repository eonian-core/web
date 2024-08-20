import clsx from 'clsx'
import type { ReactNode } from 'react'
import styles from './onboarding.module.scss'
import Button from '@/components/button/button'
import ExternalLink from '@/components/links/external-link'
import IconPencil from '@/components/icons/icon-pencil'
import IconBitcoin from '@/components/icons/icon-bitcoin'
import IconWallet from '@/components/icons/icon-wallet'
import IconKey from '@/components/icons/icon-key'
import IconEmail from '@/components/icons/icon-email'
import IconCheck from '@/components/icons/icon-check'
import IconCoinAbstract from '@/components/icons/icon-coin-abstract'
import { WrapperLink } from '@/components/links/wrapper-link'

export function Onboading() {
  return <>Work in progress</>
}

export enum OnboardingStep {
  Unkown = 'Unkown',
  AssetChosen = 'Asset Chosen',
  AmountEntered = 'Amount Entered',
  WalletConnected = 'Wallet Connected',
  TramsactionsApproved = 'Tramsactions Approved',
  EmailLinked = 'Email Linked',
}

export interface OnboardingBodyProps {
  children: OnboardingStep
  placeholder?: string
  linkEmail: () => void
}

export function OnboardingBody({ children: step, placeholder, linkEmail }: OnboardingBodyProps) {
  return <div className={styles.body}>
        <h3>Onboarding</h3>
        <div className={styles.list}>
            <ul>
                <OnboardingItem
                    previusCompleted={step === OnboardingStep.Unkown}
                    completed={[OnboardingStep.AssetChosen, OnboardingStep.AmountEntered, OnboardingStep.WalletConnected, OnboardingStep.TramsactionsApproved, OnboardingStep.EmailLinked].includes(step)}
                    title="Chose Cryptocurrency"
                    icon={<IconCoinAbstract />}
                >
                    <p>Choose the cryptocurrency you want to invest in</p>
                </OnboardingItem>

                <OnboardingItem
                    previusCompleted={step === OnboardingStep.AssetChosen}
                    completed={[OnboardingStep.AmountEntered, OnboardingStep.WalletConnected, OnboardingStep.TramsactionsApproved, OnboardingStep.EmailLinked].includes(step)}
                    title="Enter Amount"
                    icon={<IconPencil />}
                >
                    <p>Choose how much do you want to save in vault and insure. For example, {placeholder}.</p>
                </OnboardingItem>

                <OnboardingItem
                    previusCompleted={step === OnboardingStep.AmountEntered}
                    completed={[OnboardingStep.WalletConnected, OnboardingStep.TramsactionsApproved, OnboardingStep.EmailLinked].includes(step)}
                    title="Connect Wallet"
                    icon={<IconWallet />}
                >
                    <p>Securely connect your crypto wallet to interact with blockchain.</p>
                    <OnboadingActions>
                        <WrapperLink withIcon href="https://ethereum.org/en/wallets/find-wallet/#main-content">Get Wallet</WrapperLink>
                    </OnboadingActions>
                </OnboardingItem>

                <OnboardingItem
                    previusCompleted={step === OnboardingStep.WalletConnected}
                    completed={[OnboardingStep.TramsactionsApproved, OnboardingStep.EmailLinked].includes(step)}
                    title="Approve Transactions"
                    icon={<IconKey />}
                >
                    <p>Sign allowance and deposit transactions. Two-step deposit process ensure security of assets.</p>
                </OnboardingItem>

                <OnboardingItem
                    previusCompleted={step === OnboardingStep.TramsactionsApproved}
                    completed={[OnboardingStep.EmailLinked].includes(step)}
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

export interface OnboardingItemProps {
  icon: ReactNode
  children: ReactNode
  title: string
  previusCompleted: boolean
  completed: boolean
}

export function OnboardingItem({ children, icon, title, completed, previusCompleted }: OnboardingItemProps) {
  return (
        <li className={clsx(styles.item, {
          [styles.completed]: completed,
          [styles.active]: previusCompleted,
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
