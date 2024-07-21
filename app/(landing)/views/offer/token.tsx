'use client'

import type { PropsWithChildren } from 'react'
import { Progress } from '@nextui-org/react'

import clsx from 'clsx'
import { createContext, useContext } from 'react'
import Button from '../../../components/button/button'
import { InternalLink } from '../../../components/links/links'
import styles from './token.module.scss'

import { Chip } from './chip'
import type { TokenSymbol } from '@/types'
import { TokenImage } from '@/components/token-image/TokenImage'

export interface TokenProps {
  /** Used for displaying symbol and extract stats */
  token: TokenSymbol
  development?: boolean
  balance?: React.ReactNode
  href?: string
  buttonLabel?: string
  buttonDisabled?: boolean
}

export const TokenContext = createContext<TokenProps>({ token: 'ETH', development: true })
export const useToken = () => useContext(TokenContext)

export function Token({ token, children, development, balance, href, buttonLabel, buttonDisabled }: PropsWithChildren<TokenProps>) {
  const color = { '--color-token': `var(--color-token-${token})` } as React.CSSProperties
  return (
    <div className={clsx(styles.token, styles[token])} style={color}>
      <TokenContext.Provider value={{ token, development }}>
        <div className={styles.content}>
          <Logo {...{ token, development }} />

          {children}

          <Action {...{ token, development, balance, href, buttonLabel, buttonDisabled }} />
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
  if (!bordered) {
    return (
      <li>
        <Chip variant="secondary" size="small" icon={icon}>
          {children}
        </Chip>
      </li>
    )
  }

  return (
    <li>
      <Chip variant="bordered" size="small" className={styles.borderedTag}>
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

export function Action({ development, balance, href, buttonLabel, buttonDisabled }: TokenProps) {
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

      {href ? <InternalLink href={href}>{<CTAButton />}</InternalLink> : <CTAButton />}

      {development && <p className={styles.development}>Coming soon</p>}
    </div>
  )

  function CTAButton() {
    return (
      <Button disabled={buttonDisabled} size="lg" dark className={styles.actionButton}>
        {buttonLabel || (development ? 'Join the Waitlist' : 'Save')}
      </Button>
    )
  }
}

function Logo({ token }: TokenProps) {
  return (
    <div className={clsx(styles.logo, styles[token])}>
      <TokenImage symbol={token} width={256} height={256} />
    </div>
  )
}
