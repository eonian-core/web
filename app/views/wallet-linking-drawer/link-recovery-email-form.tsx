import type { ApolloError } from '@apollo/client'
import { Spinner } from '@nextui-org/react'
import type { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import styles from './wallet-linking-drawer.module.scss'
import { ShrinkedAddress } from '@/components/wallet/wallet-info'
import IconEmail from '@/components/icons/icon-email'
import IconCheck from '@/components/icons/icon-check'
import { FormInput } from '@/components/form-input/form-input'
import Button from '@/components/button/button'

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
  signing?: boolean
}

export function LinkRecoveryEmailForm({ onSubmit, loading, success, error, address, isWalletConnected, signing }: LinkRecoveryEmailFormProps) {
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
