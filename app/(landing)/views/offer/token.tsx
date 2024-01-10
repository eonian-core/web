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

import { createContext, useContext } from 'react'

export const TokenContext = createContext<TokenProps>({ token: 'ETH', development: true })
export const useToken = () => useContext(TokenContext)


export function Token({ token, children, development }: PropsWithChildren<TokenProps>) {
    return <div className={clsx(styles.token, styles[token])}>
        <TokenContext.Provider value={{ token, development }}>
            <div className={styles.content}>
                <Logo {...{ token, development }} />

                {children}

                <Action {...{ token, development }} />
            </div>
        </TokenContext.Provider>
    </div>
}

export function TokenHeader({ children }: PropsWithChildren) {
    const { token } = useToken()

    return <div className={clsx(styles.header, styles[token])}>
        <span className={styles.symbol}>{token}</span>

        <h3>
            {children}
        </h3>
    </div>
}

export function Tags({ children }: PropsWithChildren) {
    return <ol className={styles.tags}>
        {children}
    </ol>
}

export function Tag({ bordered, children, icon }: PropsWithChildren<{ bordered?: boolean; icon?: React.ReactNode }>) {
    if (!bordered) {
        return <li><Chip variant='secondary' size='small' icon={icon}>{children}</Chip></li>
    }

    return <li><Chip variant='bordered' size='small' className={styles.borderedTag}>{children}</Chip></li>
}

export const TokenStats = ({ children }: PropsWithChildren) => (
    <div className={styles.stats}>
        {children}
    </div>
)


export const YearlyReturns = ({ children }: PropsWithChildren) => (
    <div className={styles.returns}>
        <span className={styles.label}>Yearly Returns</span>
        <p className={styles.value}>{children}<Chip variant='bordered' size='small' className={styles.returnTag}>In USD</Chip></p>
    </div>
)

export const Distribution = ({ children }: PropsWithChildren) => (
    <div className={styles.distribution}>
        {children}
    </div>
) 

export const TokenFees = ({ children }: PropsWithChildren) => (
    <div className={styles.item}>
        <span className={styles.label}>Fees</span>
        <span className={styles.value}>{children}</span>
    </div>
)

export const TokenApy = ({ children }: PropsWithChildren) => (
    <div className={styles.item}>
        <span className={styles.label}>APY</span>
        <span className={styles.value}>{children}</span>
    </div>
)

export const TokenGrowth = ({ children }: PropsWithChildren) => (
    <div className={styles.item}>
        <span className={styles.label}>Growth</span>
        <span className={styles.value}>{children}</span>
    </div>
)

export function Action({ development }: TokenProps) {
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

// TODO: pass image throw mdx file
const logos = {
    BTC: BtcImage,
    ETH: EthImage,
    USDT: UsdtImage,
}

function Logo({ token }: TokenProps) {
    return <div className={clsx(styles.logo, styles[token])}>
        <Image src={logos[token]} alt={token} width={256} height={256} />
    </div>
}
