import type { FC, FormEventHandler, PropsWithChildren } from 'react'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from 'react-hook-form'
import { Spinner } from '@nextui-org/react'
import type { ApolloError } from '@apollo/client'
import styles from './wallet-linking-drawer.module.scss'
import { Drawer } from '@/components/drawer/drawer'
import Button from '@/components/button/button'
import IconEmail from '@/components/icons/icon-email'
import { FormInput } from '@/components/form-input/form-input'
import type { LinkEmailToWalletInput } from '@/api/wallet-linking/gql/graphql'
import { EmailLink, MutationAction } from '@/api/wallet-linking/gql/graphql'
import { useLinkEmailToWallet } from '@/api/wallet-linking/wallet/use-link-email-to-wallet'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import IconCheck from '@/components/icons/icon-check'
import { ShrinkedAddress } from '@/components/wallet/wallet-info'

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
      <Drawer title={'Recovery email'} {...props}>
        <div className={styles.formWrapper}>
          <LinkRecoveryEmailFlow />
        </div>
      </Drawer>
  )
}

export function LinkRecoveryEmailFlow() {
  const { wallet, chain, signMessage } = useWalletWrapperContext()
  const address = wallet?.address
  const chainId = chain?.id
  const isWalletConnected = !!(address && chainId)

  const [linkEmail, { data, loading, error }] = useLinkEmailToWallet()

  const [signing, setIsSigning] = useState(false)

  const signLinkingMessage = useCallback(async (input: Omit<LinkEmailToWalletInput, 'signature'>): Promise<string | null> => {
    try {
      setIsSigning(true)

      const message = buildSignMessage(input)
      const signature = await signMessage(message)

      setIsSigning(false)
      return signature
    }
    catch (error) {
      console.warn('Failed to sign message', error)
      setIsSigning(false)

      return null
    }
  }, [signMessage, setIsSigning])

  const onSubmit = useCallback(async ({ email }: FormInputs) => {
    if (!isWalletConnected) {
      console.warn('Wallet is not connected')
      return
    }

    const input: Omit<LinkEmailToWalletInput, 'signature'> = {
      action: MutationAction.Link,
      payload: {
        address,
        chainId,
        link: { email },
      },
      timestamp: new Date().toISOString(),
    }
    // eslint-disable-next-line no-console
    console.log('onSubmit', email, input)

    const signature = await signLinkingMessage(input)

    await linkEmail({
      variables: {
        input: {
          ...input,
          signature,
        },
      },
    })
  }, [linkEmail, isWalletConnected, address, chainId, signLinkingMessage])

  return (
    <LinkRecoveryEmailForm {...{
      onSubmit,
      loading,
      error,
      isWalletConnected,
      address,
      signing,
      success: !!(data && !error),
    }}/>
  )
}

interface FormInputs {
  email: string
}

interface LinkRecoveryEmailFormProps {
  onSubmit: (data: FormInputs) => void | Promise<void>
  success?: boolean
  loading?: boolean
  error?: Error | ApolloError | null
  isWalletConnected?: boolean
  address?: string
  signing?: boolean
}

function LinkRecoveryEmailForm({ onSubmit, loading, success, error, address, isWalletConnected, signing }: LinkRecoveryEmailFormProps) {
  const { control, handleSubmit, formState } = useForm<FormInputs>()

  const fullFormDisabled = loading || success || signing || !isWalletConnected

  return (
    <form onSubmit={handleSubmit(onSubmit) as FormEventHandler<any>} className={styles.form}>
      <div className={styles.header}>
        <h3>{success ? 'Email Linked' : 'Provide Your Email'}</h3>
        <p>This email you will be able to use to recover access to assets in case of {address && <ShrinkedAddress>{address}</ShrinkedAddress>} wallet hack</p>
      </div>
      <FormInput
        name="email"
        control={control}
        type="email"
        label="Email"
        labelPlacement='outside'
        className={styles.input}
        variant='bordered'
        disabled={fullFormDisabled}
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
        disabled={!formState.isValid || fullFormDisabled}
      >
         <SubmitText {...{ success, loading, isWalletConnected, signing }} />
      </Button>

      {error && (<div className={styles.error}>
        <h4>Error during linking, please try again</h4>
        <p>{error?.message}</p>
      </div>)}
    </form>
  )
}

interface SubmitTextProps {
  success?: boolean
  loading?: boolean
  signing?: boolean
  isWalletConnected?: boolean
}

function SubmitText({ success, loading, isWalletConnected, signing }: SubmitTextProps) {
  if (success)
    return <IconCheck />

  if (loading)
    return <Spinner />

  if (signing)
    return 'Sign linking message'

  if (!isWalletConnected)
    return 'Connect wallet to link'

  return 'Link'
}

function buildSignMessage({ payload, timestamp, action }: Omit<LinkEmailToWalletInput, 'signature'>) {
  const { email } = payload.link

  const firstLine = action === MutationAction.Link
    ? `Certify Eonian that ${email} email should be linked to current wallet.`
    : `Certify Eonian that ${email} email should be unlinked from current wallet.`

  return `${firstLine}
Detailed info:
  - Wallet: ${payload.address}
  - Chain id: ${payload.chainId} 
  - Action: ${action} 
  - Time: ${timestamp}
`
}
