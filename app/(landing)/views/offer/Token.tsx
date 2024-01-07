import { PropsWithChildren } from 'react'
import styles from './token.module.scss'
import Button from '../../../components/button/button';
import { Progress } from '@nextui-org/react';

export type TokenSymbol = "ETH" | "BTC" | "USDT";

export interface TokenProps {
    /** Used for displaying symbol and extract stats */
    token: TokenSymbol
    children: React.ReactNode
    development?: boolean
}
  
export function Token({ token, children, development }: TokenProps) {
    return <div className={styles.token}>
        <div className={styles.header}>
            <span className={styles.symbol}>{token}</span>
            {children}
        </div>

        <TokenStats {...{token}}/>

        <Action {...{token, development}} />

    </div>
}
  
export function TokenStats({}: {token: TokenSymbol}) {
    return (
        <div className={styles.stats}>
            <div className={styles.returns}>
                <span className={styles.label}>Real Returns</span>
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

export function Action({token, development}: {token: TokenSymbol, development?: boolean}) {
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