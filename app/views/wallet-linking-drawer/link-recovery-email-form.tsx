import type { ApolloError } from '@apollo/client'
import { Spinner } from '@heroui/react'
import type { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import styles from './wallet-linking-drawer.module.scss'
import { ShrinkedAddress } from '@/components/wallet/wallet-info'
import IconEmail from '@/components/icons/icon-email'
import IconCheck from '@/components/icons/icon-check'
import { FormInput } from '@/components/form-input/form-input'
import Button from '@/components/button/button'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { emailPattern } from '@/validators'

export interface FormInputs {
  email: string
}

export interface LinkRecoveryEmailFormProps {
  onSubmit: (data: FormInputs) => void | Promise<void>
  success?: boolean
  loading?: boolean
  error?: Error | ApolloError | null
  isWalletConnected?: boolean
  address?: string
  loggingIn?: boolean
}

export function LinkRecoveryEmailForm({
  onSubmit,
  loading,
  success,
  error,
  address,
  isWalletConnected,
  loggingIn,
}: LinkRecoveryEmailFormProps) {
  const { control, handleSubmit, formState } = useForm<FormInputs>()

  const fullFormDisabled = loading || success || loggingIn || !isWalletConnected

  return (
    <form onSubmit={handleSubmit(onSubmit) as FormEventHandler<any>} className={styles.form}>
      <div className={styles.header}>
        <h3>{success ? 'Email Linked' : 'Provide Your Email'}</h3>
        <p>
          This email you will be able to use to recover access to assets in case of{' '}
          {address && <ShrinkedAddress>{address}</ShrinkedAddress>} wallet hack
        </p>
      </div>
      <FormInput
        data-autofocus
        name="email"
        control={control}
        type="email"
        label="Email"
        labelPlacement="outside"
        className={styles.input}
        variant="bordered"
        disabled={fullFormDisabled}
        rules={{ required: true, pattern: emailPattern }}
        startContent={<IconEmail />}
        errorMessage={<span>Please enter a valid email address</span>}
      />
      <Button
        gradient
        wide
        size="lg"
        className={clsx(styles.button, { [styles.success]: success })}
        type="submit"
        disabled={!formState.isValid || fullFormDisabled}
      >
        <SubmitText {...{ success, loading, isWalletConnected, loggingIn }} />
      </Button>

      {error && (
        <div className={styles.error}>
          <h4>Error during linking, please try again</h4>
          <p>{error?.message}</p>
        </div>
      )}
    </form>
  )
}

interface SubmitTextProps {
  success?: boolean
  loading?: boolean
  loggingIn?: boolean
  isWalletConnected?: boolean
}

function SubmitText({ success, loading, isWalletConnected, loggingIn }: SubmitTextProps) {
  const { wallet } = useWalletWrapperContext()

  if (success)
    return <IconCheck width={32} height={32} />

  if (loading)
    return <Spinner />

  if (loggingIn)
    return `Sign login message in ${wallet?.label ?? 'your wallet'}...`

  if (!isWalletConnected)
    return 'Connect wallet to link'

  return 'Link'
}
