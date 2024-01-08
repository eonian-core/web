import { PropsWithChildren } from 'react';
import { Progress, Chip } from '@nextui-org/react';
import Image from 'next/image'

import styles from './token.module.scss'
import Button from '../../../components/button/button';

import BtcImage from './image/BTC_logo.png'
import EthImage from './image/ETH_logo.png'
import UsdtImage from './image/USDT_logo.png'
import clsx from 'clsx';

export type TokenSymbol = "ETH" | "BTC" | "USDT";

export interface TokenProps {
    /** Used for displaying symbol and extract stats */
    token: TokenSymbol
    development?: boolean
}

export function Token({ token, children, development }: PropsWithChildren<TokenProps>) {
    return <div className={clsx(styles.token, styles[token])}>
        <div className={styles.content}>
            <Logo {...{token}} />

            <TokenHeader {...{token}}>{children}</TokenHeader>

            <TokenStats {...{token}}/>

            <Action {...{token, development}} />
        </div>
    </div>
}

export const TokenHeader = ({token, children}: PropsWithChildren<Pick<TokenProps, "token">>) => (
    <div className={styles.header}>
        <span className={styles.symbol}>{token}</span>

        <h3>
            <span className={styles.actualText}>&nbsp;{children}&nbsp;</span>
            <span className={styles.hoverText} aria-hidden="true">&nbsp;{children}&nbsp;</span>
        </h3>
    </div>
)

export function TokenStats({}: Pick<TokenProps, "token">) {
    return (
        <div className={styles.stats}>
            <div className={styles.returns}>
                <span className={styles.label}>Yearly Returns</span>
                <p className={styles.value}>+87.95%<span className={styles.tag}>In USD</span></p>
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

export function Action({token, development}: TokenProps) {
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
                {development ? "Join the Waitlist" : "Save"}
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

const Logo = ({token}: Pick<TokenProps, "token">) => (
    <div className={clsx(styles.logo, styles[token])}>
        <Image src={logos[token]} alt={token} width={256} height={256} />
    </div>
)