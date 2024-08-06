'use client'

import { Card, CardBody } from '@nextui-org/react'
import React from 'react'

import clsx from 'clsx'
import type { Vault } from '../../../api'

import CompactNumber from '../../../components/compact-number/compact-number'
import IconBoxArrow from '../../../components/icons/icon-box-arrow'

import { calculateVaultAPY } from '../../../finances/apy'
import { FormAction } from '../../../store/slices/vaultActionSlice'
import styles from './vault-info-card.module.scss'

interface Props {
  value: bigint
  currentDeposit: bigint
  vault: Vault
  formAction: FormAction
  className?: string
}

export const VaultInfoCard: React.FC<Props> = ({ value, currentDeposit, vault, formAction, className }) => {
  const { symbol: assetSymbol } = vault.asset

  const [apyPercents, apy, apyD] = React.useMemo(() => {
    const bps = 1e6
    const apy = calculateVaultAPY(vault.rates[0].apy.yearly, vault.asset.decimals)
    return [apy, BigInt(Number.parseInt(String(apy * bps))), BigInt(bps * 100)]
  }, [vault])

  const total = React.useMemo(() => {
    switch (formAction) {
      case FormAction.DEPOSIT:
        return currentDeposit + value
      case FormAction.WITHDRAW:
        return currentDeposit < value ? 0n : currentDeposit - value
    }
  }, [currentDeposit, value, formAction])

  const currentYearlyReward = React.useMemo(() => (currentDeposit * apy) / apyD, [currentDeposit, apy, apyD])

  const yearlyReward = React.useMemo(() => (total * apy) / apyD, [total, apy, apyD])

  const depositInAYear = React.useMemo(() => total + yearlyReward, [total, yearlyReward])

  const profitChange = React.useMemo(() => yearlyReward - currentYearlyReward, [yearlyReward, currentYearlyReward])

  return (
    <CardBody className={className}>
      <header className={styles.apyInfo}>
        With the current <b>{apyPercents.toFixed(2)}% APY</b>, projected
      </header>
      <Card className={styles.info} shadow="none">
        <CardBody>
          <ul>
            <li>
              <h5>Yearly reward</h5>
              <InfoNumber
                value={yearlyReward}
                decimals={vault.asset.decimals}
                {...{
                  assetSymbol,
                  profitChange,
                }}
                />
            </li>
            <li>
              <h5>Deposit in a year</h5>
              <InfoNumber
                value={depositInAYear}
                decimals={vault.asset.decimals}
                {...{
                  assetSymbol,
                  profitChange,
                }}
                />
            </li>
          </ul>
        </CardBody>
      </Card>
    </CardBody>
  )
}

export interface InfoNumberProps {
  value: bigint
  profitChange: bigint
  assetSymbol: string
  decimals: number
}

function InfoNumber({ value, profitChange, assetSymbol, decimals }: InfoNumberProps) {
  return (
    <div className={styles.infoNumberWrapper}>
      <CompactNumber
        value={value}
        decimals={decimals}
        fractionDigits={2}
        className={styles.infoNumber}
        tooltipContent={value => `${value} ${assetSymbol}`}
      >
        <span className={styles.asset}>{assetSymbol}</span>
        <ProfitChangeIndicator profitChange={profitChange} />
      </CompactNumber>
    </div>
  )
}

function ProfitChangeIndicator({ profitChange }: { profitChange: bigint }) {
  const direction = React.useMemo(() => (profitChange > 0 ? 'top' : 'bottom'), [profitChange])

  if (!profitChange)
    return null

  const className = clsx({
    [styles.positiveChange]: profitChange > 0n,
    [styles.negativeChange]: profitChange < 0n,
  })

  return (
    <span className={className}>
      <IconBoxArrow direction={direction} />
    </span>
  )
}
