'use client'

import type { PropsWithChildren } from 'react'
import { Progress } from '@nextui-org/react'

import clsx from 'clsx'
import { createContext, useContext } from 'react'
import styles from './token.module.scss'
import type { ButtonProps } from '@/components/button/button'
import Button from '@/components/button/button'
import { InternalLink } from '@/components/links/links'

import { Chip } from '@/components/chip/chip'
import type { TokenSymbol } from '@/types'
import { TokenImage } from '@/components/token-image/TokenImage'

export enum TokenState {
  Active = 'active',
  InDevelopment = 'in-development',
  Planned = 'planned',
}

export interface TokenProps {
  /** Used for displaying symbol and extract stats */
  token: TokenSymbol
  state?: TokenState
  className?: string
  contentClassName?: string
}

export const TokenContext = createContext<{
  token: TokenSymbol
  state: TokenState
}>({ token: 'ETH', state: TokenState.Active })
export const useToken = () => useContext(TokenContext)

export function Token({ token, children, state = TokenState.Active, className, contentClassName }: PropsWithChildren<TokenProps>) {
  const color = { '--color-token': `var(--color-token-${token})` } as React.CSSProperties

  return (
    <div className={clsx(styles.token, styles[token], className, {
      [styles.planned]: state === TokenState.Planned,
    })} style={color}>
      <TokenContext.Provider value={{ token, state }}>
        <div className={clsx(styles.content, contentClassName)}>
          <Logo />

          {children}
        </div>
      </TokenContext.Provider>
    </div>
  )
}

export function TokenHeader({ children }: PropsWithChildren) {
  const { token } = useToken()

  return (
    <div className={clsx(styles.header, styles[token])}>
      <span className={styles.symbol}>{token}</span>

      <h3>{children}</h3>
    </div>
  )
}

export function Tags({ children }: PropsWithChildren) {
  return <ol className={styles.tags}>{children}</ol>
}

export function Tag({ bordered, children, icon }: PropsWithChildren<{ bordered?: boolean; icon?: React.ReactNode }>) {
  const { state } = useToken()

  if (!bordered) {
    return (
      <li>
        <Chip
          variant="secondary"
          size="small"
          icon={icon}
          className={clsx({ [styles.plannedTag]: state === TokenState.Planned })}
        >
          {children}
        </Chip>
      </li>
    )
  }

  return (
    <li>
      <Chip variant="bordered" size="small" className={clsx(styles.borderedTag, { [styles.plannedTag]: state === TokenState.Planned })}>
        {children}
      </Chip>
    </li>
  )
}

export function TokenStats({ children }: PropsWithChildren) {
  return <div className={styles.stats}>{children}</div>
}

export function YearlyReturns({ children }: PropsWithChildren) {
  return (
    <div className={styles.returns}>
      <span className={styles.label}>Past Year Returns</span>
      <p className={styles.value}>
        {children}
        <Chip variant="bordered" size="small" className={styles.returnTag}>
          In USD
        </Chip>
      </p>
    </div>
  )
}

export function Distribution({ children }: PropsWithChildren) {
  return <div className={styles.distribution}>{children}</div>
}

export function TokenFees({ children }: PropsWithChildren) {
  return (
    <div className={styles.item}>
      <span className={styles.label}>Fees</span>
      <span className={styles.value}>{children}</span>
    </div>
  )
}

export function TokenApy({ children }: PropsWithChildren) {
  return (
    <div className={styles.item}>
      <span className={styles.label}>APY</span>
      <span className={styles.value}>{children}</span>
    </div>
  )
}

export function TokenGrowth({ children }: PropsWithChildren) {
  return (
    <div className={styles.item}>
      <span className={styles.label}>Growth</span>
      <span className={styles.value}>{children}</span>
    </div>
  )
}

export interface ActionProps {
  balance?: React.ReactNode
  href?: string
  children?: React.ReactNode
}

const CtaButtonText = {
  [TokenState.Active]: 'Save',
  [TokenState.InDevelopment]: 'Join the Waitlist',
  [TokenState.Planned]: 'Coming soon',
}

export function TokenAction({ balance, href, children }: ActionProps) {
  const { state } = useToken()
  return (
    <div className={styles.action}>
      {balance && (
        <>
          <div className={styles.balance}>
            <span className={styles.label}>Balance</span>
            <span className={styles.value}>{balance}</span>
          </div>
        </>
      )}
      <div className={styles.insurance}>
        <span className={styles.label}>Insurance Coverage</span>
        <span className={styles.value}>100%</span>
      </div>

      <div className={styles.insuranceInducatorWrapper}>
        <Progress
          size="sm"
          aria-label="Insurance"
          value={100}
          classNames={{
            indicator: styles.insuranceInducator,
          }}
        />
      </div>

      <ButtonLink
        size="lg"
        dark={state !== TokenState.Planned}
        bordered={state === TokenState.Planned}
        // development={state === TokenState.Planned}
        className={styles.actionButton}
        disabled={state === TokenState.Planned}
        href={href}
        >
        {children || CtaButtonText[state]}
      </ButtonLink>

      {state === TokenState.InDevelopment && <p className={styles.development}>Coming soon</p>}
    </div>
  )
}

export function ButtonLink({ children, href, ...props }: ButtonProps & { href?: string }) {
  if (!href)
    return <Button {...props}>{children}</Button>

  return (
    <InternalLink href={href}>
      <Button {...props}>{children}</Button>
    </InternalLink>
  )
}

function Logo() {
  const { token } = useToken()

  return (
    <div className={clsx(styles.logo, styles[token])}>
      <TokenImage symbol={token} width={312} height={312} />
    </div>
  )
}
