import type { ApolloError } from '@apollo/client'
import type { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import styles from './notify-token-drawer.module.scss'
import { FormInput } from '@/components/form-input/form-input'
import Button from '@/components/button/button'
import { emailPattern } from '@/validators'
import IconEmail from '@/components/icons/icon-email'

export interface NotifyEmailFormInput {
  email: string
}

export interface NotifyEmailFormProps {
  onSubmit: (data: NotifyEmailFormInput) => void | Promise<void>
  success?: boolean
  loading?: boolean
  error?: Error | ApolloError | null
}

export function NotifyEmailForm({
  onSubmit,
  loading,
  success,
  error,
}: NotifyEmailFormProps) {
  const { control, handleSubmit, formState } = useForm<NotifyEmailFormInput>()

  const fullFormDisabled = loading || success

  return (
    <form onSubmit={handleSubmit(onSubmit) as FormEventHandler<any>} className={styles.form}>
      <div className={styles.header}>
        <h3>Thank you!<br />We can notify you when we add it</h3>
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
          Get me know
        </Button>

        <p className={styles.description}>
          We don’t share it with anyone
        </p>

      {error && (
        <div className={styles.error}>
          <h4>Error during request, please try again</h4>
          <p>{error?.message}</p>
        </div>
      )}

    </form>
  )
}
