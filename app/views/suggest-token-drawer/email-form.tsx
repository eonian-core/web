import type { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import styles from './suggest-token-drawer.module.scss'
import { FormInput } from '@/components/form-input/form-input'
import Button from '@/components/button/button'
import { emailPattern } from '@/validators'
import IconEmail from '@/components/icons/icon-email'

export interface EmailFormInput {
  email: string
}

export interface EmailFormProps {
  onSubmit: (data: EmailFormInput) => void | Promise<void>
  success?: boolean
  loading?: boolean
  error?: Error | null
}

export function EmailForm({
  onSubmit,
  loading,
  success,
  error,
}: EmailFormProps) {
  const { control, handleSubmit, formState } = useForm<EmailFormInput>()

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
        className={styles.input}
        variant="bordered"
        placeholder="love@eonian.finance"
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
