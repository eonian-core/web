'use client'

import React from 'react'
import { Button, CardHeader } from '@nextui-org/react'

import clsx from 'clsx'
import { FormAction } from '../../../store/slices/vaultActionSlice'
import { useVaultContext } from '../hooks/use-vault-context'
import styles from './form-header.module.scss'
import { INPUT_ID } from './form-input'

function FormHeader() {
  const { formAction, setFormAction } = useVaultContext()

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    setFormAction(target.dataset.key as FormAction)

    const input = document.getElementById(INPUT_ID)
    input?.focus()
  }

  return (
    <CardHeader className={styles.header}>
      <TabButton action={FormAction.DEPOSIT} currentAction={formAction} text="Save" onClick={handleClick} />
      <TabButton action={FormAction.WITHDRAW} currentAction={formAction} text="Withdraw" onClick={handleClick} />
    </CardHeader>
  )
}

interface TabButtonProps {
  currentAction: FormAction
  action: FormAction
  text: string
  onClick: (event: React.MouseEvent) => void
}

function TabButton({ action, currentAction, text, onClick }: TabButtonProps) {
  return (
    <span
      data-key={action}
      onClick={onClick}
      className={clsx(styles.button, {
        [styles.buttonActive]: currentAction === action,
      })}
    >
      {text}
    </span>
  )
}

export default FormHeader
