import { Button, Divider } from '@nextui-org/react'
import clsx from 'clsx'
import { useCallback } from 'react'
import { useVaultContext } from '../hooks/use-vault-context'
import { focusOnInput } from './form-input'
import styles from './arrow-divider.module.scss'
import { FormAction } from '@/store/slices/vaultActionSlice'
import IconArrowRightShort from '@/components/icons/icon-arrow-right-short'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useAppSelector } from '@/store/hooks'
import { useLocalCompactBigInt } from '@/components/compact-number/compact-number'
import { FractionPartView } from '@/finances/humanize'
import { useDivToPercent, useMultiplyOnPercent, usePercentToBigInt } from '@/finances/percent'

const options = [0.25, 0.5, 0.75, 1]

export function ArrowDivider({ size }: { size: number }) {
  const { formAction, setFormAction } = useVaultContext()
  const handleClick = useCallback(() => {
    setFormAction(formAction === FormAction.DEPOSIT ? FormAction.WITHDRAW : FormAction.DEPOSIT)

    focusOnInput()
  }, [formAction, setFormAction])

  const { status } = useWalletWrapperContext()
  const isWalletConnected = status === WalletStatus.CONNECTED

  const { walletBalanceBN, vaultBalanceBN } = useAppSelector(state => state.vaultUser)
  const balance = formAction === FormAction.DEPOSIT ? BigInt(walletBalanceBN) : BigInt(vaultBalanceBN)
  const balanceNotEmpty = balance > 0n
  const showPicker = isWalletConnected && balanceNotEmpty

  return (
        <div className={clsx(styles.divider, { [styles.withPicker]: showPicker })}>
            {showPicker && <PercentPicker {...{ balance }}>{options}</PercentPicker>}
            <Divider />
            <div
                className={clsx(styles.arrow, 'bg-content1', {
                  [styles.reverse]: formAction === FormAction.WITHDRAW,
                })}
                onClick={handleClick}
            >
                <IconArrowRightShort width={size} height={size} />
            </div>
        </div>
  )
}

export function PercentPicker({ children, balance }: { children: Array<number>; balance: bigint }) {
  const { inputValue = 0n, vault } = useVaultContext()
  const currentPercent = useDivToPercent(inputValue, balance)

  return (
        <div className={styles.percentPicker}>
            {children.map(option => (
                <PercentOption
                    key={option}
                    {...{ currentPercent, balance }}
                    decimals={vault.asset.decimals}
                >{option}</PercentOption>
            ),
            )}
        </div>
  )
}

export interface PercentOptionProps {
  children: number
  currentPercent: bigint
  balance: bigint
  decimals: number
}

const formatOptions = {
  threshold: 0n,
  fractionDigits: 5,
  fractionPartView: FractionPartView.CUT,
}

export function PercentOption({ children: option, currentPercent, balance, decimals }: PercentOptionProps) {
  const { onValueChange } = useVaultContext()
  const value = useMultiplyOnPercent(balance, option)
  const { raw, result: formated } = useLocalCompactBigInt(value, decimals, formatOptions)

  const onClick = useCallback(() => {
    if (raw === formated // formating unnnecessary, will use raw
            || Number.isNaN(+formated) // formated number can be something like "<0.00001", will use raw
            || option === 1 // option is 100%, will use raw
    ) {
      onValueChange(raw)
      return
    }

    // number were cutted, but it not 100%,
    // so need add at least one digit to make it greater or equal the real number
    // calculations can be compex and any digites lower than 9 can result in lower number
    onValueChange(`${formated}9`)
  }, [onValueChange, raw, formated, option])

  const optionN = usePercentToBigInt(option)

  return (
        <Button className={clsx(styles.option, { [styles.active]: optionN <= currentPercent })} size="sm" variant="flat" onClick={onClick}>
            {option * 100}%
        </Button>
  )
}
