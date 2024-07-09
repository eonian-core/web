'use client'

import type { InputProps } from '@nextui-org/react'
import { Input, Spinner } from '@nextui-org/react'
import React from 'react'

import IconCoin from '../../../components/icons/icon-coin'
import CompactNumber from '../../../components/compact-number/compact-number'
import { FractionPartView } from '../../../shared'
import styles from './form-input.module.scss'
import type { TokenSymbol } from '@/types'

interface Props extends Partial<Omit<InputProps, 'value' | 'onChange'>> {
  value: string
  balance: bigint
  decimals: number
  assetSymbol: TokenSymbol
  onChange: (value: string) => void
  isLoading: boolean
}

const FormInput: React.FC<Props> = ({
  assetSymbol,
  balance,
  value,
  onChange,
  isLoading,
  disabled,
  decimals,
  ...restProps
}) => {
  const handleInputValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange],
  )

  return (
    <Input
      className={styles.input}
      value={value}
      variant="bordered"
      color="primary"
      placeholder="0"
      size="lg"
      startContent={<IconCoin className={styles.asset} symbol={assetSymbol} width="1.25em" height="1.25em" />}
      endContent={
        <InputRightContent balance={balance} isLoading={isLoading} decimals={decimals} assetSymbol={assetSymbol} />
      }
      onChange={handleInputValueChange}
      disabled={disabled || isLoading}
      {...restProps}
    />
  )
}

function InputRightContent({
  balance,
  isLoading,
  decimals,
  assetSymbol,
}: Pick<Props, 'balance' | 'isLoading' | 'decimals' | 'assetSymbol'>) {
  if (isLoading)
    return <Spinner className={styles.loading} size="sm" />

  return (
    <span className={styles.balance}>
      <CompactNumber
        value={balance}
        decimals={decimals}
        threshold={0n}
        fractionDigits={2}
        fractionPartView={FractionPartView.CUT}
        tooltipContent={value => `${value} ${assetSymbol}`}
        childrenAtStart
      >
        Balance:&nbsp;
      </CompactNumber>
    </span>
  )
}

export default FormInput
