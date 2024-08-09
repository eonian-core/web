'use client'

import React, { useCallback } from 'react'

import { FormAction } from '../../../../store/slices/vaultActionSlice'
import { useVaultContext } from '../../hooks/use-vault-context'
import { focusOnInput } from '../form-input/form-input'
import { FormHeaderBody, TabButton } from './form-header-body'

function FormHeader() {
  const { formAction, setFormAction } = useVaultContext()

  const handleClick = useCallback((event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    setFormAction(target.dataset.key as FormAction)

    focusOnInput()
  }, [setFormAction])

  return (
    <FormHeaderBody>
      <TabButton action={FormAction.DEPOSIT} currentAction={formAction} onClick={handleClick}>Save</TabButton>
      <TabButton action={FormAction.WITHDRAW} currentAction={formAction} onClick={handleClick}>Withdraw</TabButton>
    </FormHeaderBody>
  )
}

export default FormHeader
