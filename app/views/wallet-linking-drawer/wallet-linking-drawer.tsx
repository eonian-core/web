import type { FC, FormEventHandler, PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from 'react-hook-form'
import styles from './wallet-linking-drawer.module.scss'
import { Drawer } from '@/components/drawer/drawer'
import Button from '@/components/button/button'
import IconEmail from '@/components/icons/icon-email'
import { FormInput } from '@/components/form-input/form-input'

interface WalletLinkingContextProps {
  opened: boolean
  open: () => void
  close: () => void
}

const WalletLinkingContext = createContext<WalletLinkingContextProps | undefined>(undefined)

export const WalletLinkingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <WalletLinkingContext.Provider value={{ opened, open, close }}>
        <WalletLinkingDrawer {...{ opened, onClose: close }} />
      {children}
    </WalletLinkingContext.Provider>
  )
}

export function useWalletLinkingContext(): WalletLinkingContextProps {
  const context = useContext(WalletLinkingContext)
  if (!context)
    throw new Error('useWalletLinkingContext must be used within a WalletLinkingProvider')

  return context
}

export function WalletLinkingDrawer(props: { opened: boolean; onClose: () => void }) {
  return (
        <Drawer
        title={'Recovery email'}
        {...props}
      >
        <div className={styles.formWrapper}>
          <LinkRecoveryEmailForm />
        </div>
      </Drawer>
  )
}

interface FormInputs {
  email: string
}

function LinkRecoveryEmailForm() {
  const { control, handleSubmit, formState } = useForm<FormInputs>()

  const onSubmit = (data: FormInputs): void => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit) as FormEventHandler<any>} >
      <div className={styles.header}>
        <h3>Provide Your Email</h3>
        <p>This email you will be able to use to recover access to assets in case of wallet hack</p>
      </div>
      <FormInput
        name="email"
        control={control}
        type="email"
        label="Email"
        labelPlacement='outside'
        className={styles.input}
        variant='bordered'
        rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }}
        startContent={<IconEmail />}
        errorMessage={<span>Please enter a valid email address</span>}
      />
      <Button
        gradient
        wide
        size='lg'
        className={styles.button}
        type="submit"
        disabled={!formState.isValid}
      >Link</Button>
    </form>
  )
}
