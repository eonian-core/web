import type { PropsWithChildren } from 'react'
import { Progress } from '@nextui-org/react'
import Image from 'next/image'

import clsx from 'clsx'
import Button from '../../../components/button/button'
import IconShieldHeart from '../../../components/icons/icon-shield-heart'
import IconPalmTree from '../../../components/icons/icon-paml-tree'
import styles from './token.module.scss'

import BtcImage from './image/BTC_logo.png'
import EthImage from './image/ETH_logo.png'
import UsdtImage from './image/USDT_logo.png'
import { Chip } from './chip'

export type TokenSymbol = 'ETH' | 'BTC' | 'USDT'

export interface TokenProps {
  /** Used for displaying symbol and extract stats */
  token: TokenSymbol
  development?: boolean
}

export function Token({ token, children, development }: PropsWithChildren<TokenProps>) {
  return <div className={clsx(styles.token, styles[token])}>
        <div className={styles.content}>
            <Logo {...{ token }} />

            <TokenHeader {...{ token }}>{children}</TokenHeader>

            <Tags {...{ token }} />

            <TokenStats {...{ token }}/>

            <Action {...{ token, development }} />
        </div>
    </div>
}

export function TokenHeader({ token, children }: PropsWithChildren<Pick<TokenProps, 'token'>>) {
  return <div className={clsx(styles.header, styles[token])}>
        <span className={styles.symbol}>{token}</span>

        <h3>
            {children}
        </h3>
    </div>
}

export function Tags({ token }: Pick<TokenProps, 'token'>) {
  return <ol className={styles.tags}>
        <li>{token === 'USDT'
          ? (<Tag icon={<IconPalmTree />}>Earn Passively</Tag>)
          : (<Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>)
        }</li>
        <li><Tag bordered >Innovation</Tag></li>
        <li>{token !== 'USDT'
          ? (<Tag bordered>Save and Forget</Tag>)
          : (<Tag bordered>Zero Fee Insurance</Tag>)
            }</li>

    </ol>
}

function Tag({ bordered, children, icon }: PropsWithChildren<{ bordered?: boolean; icon?: React.ReactNode }>) {
  if (!bordered) {
    return <Chip variant='secondary' size='small' icon={icon}>{children}</Chip>
  }

  return <Chip variant='bordered' size='small' className={styles.borderedTag}>{children}</Chip>
}

// eslint-disable-next-line no-empty-pattern
export function TokenStats({}: Pick<TokenProps, 'token'>) {
  return (
        <div className={styles.stats}>
            <div className={styles.returns}>
                <span className={styles.label}>Yearly Returns</span>
                <p className={styles.value}>+87.95%<Chip variant='bordered' size='small' className={styles.returnTag}>In USD</Chip></p>
            </div>

            <div className={styles.distribution}>
                <div className={styles.item}>
                    <span className={styles.label}>Fees</span>
                    <span className={styles.value}>0%</span>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>APY</span>
                    <span className={styles.value}>~3%</span>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>Growth</span>
                    <span className={styles.value}>~85%</span>
                </div>
            </div>
        </div>
  )
}

export function Action({ token, development }: TokenProps) {
  return (
        <div className={styles.action}>
            <div className={styles.insurance}>
                <span className={styles.label}>Insurance Coverage</span>
                <span className={styles.value}>100%</span>
            </div>

            <Progress size="sm" aria-label="Insurance" value={100} classNames={{
              indicator: styles.insuranceInducator,
            }} />

            <Button size='lg' dark className={styles.actionButton}>
                {development ? 'Join the Waitlist' : 'Save'}
            </Button>

            {development && <p className={styles.development}>Coming soon</p>}
        </div>
  )
}

const logos = {
  BTC: BtcImage,
  ETH: EthImage,
  USDT: UsdtImage,
}

function Logo({ token }: Pick<TokenProps, 'token'>) {
  return <div className={clsx(styles.logo, styles[token])}>
        <Image src={logos[token]} alt={token} width={256} height={256} />
    </div>
}
