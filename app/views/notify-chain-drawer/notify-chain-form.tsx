import type { ApolloError } from '@apollo/client'
import type { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import styles from './notify-token-drawer.module.scss'
import { FormInput } from '@/components/form-input/form-input'
import Button from '@/components/button/button'

export interface NotifyChainFormInput {
  chain: string
}

export interface NotifyChainFormProps {
  onSubmit: (data: NotifyChainFormInput) => void | Promise<void>
  success?: boolean
  loading?: boolean
  error?: Error | ApolloError | null
}

export function NotifyChainForm({
  onSubmit,
  loading,
  success,
  error,
}: NotifyChainFormProps) {
  const { control, handleSubmit, formState } = useForm<NotifyChainFormInput>()

  const fullFormDisabled = loading || success

  return (
    <form onSubmit={handleSubmit(onSubmit) as FormEventHandler<any>} className={styles.form}>
      <div className={styles.header}>
        <h3>What chain do you use?</h3>
      </div>

      <FormInput
        data-autofocus
        name="token"
        control={control}
        type="text"
        placeholder="TODO: TBD"
        labelPlacement="inside"
        className={styles.input}
        variant="bordered"
        disabled={fullFormDisabled}
        rules={{ required: true }}
        errorMessage={<span>Please enter what chain do you use?</span>}
      />

        <Button
          gradient
          wide
          size="lg"
          className={clsx(styles.button, { [styles.success]: success })}
          type="submit"
          disabled={!formState.isValid || fullFormDisabled}
        >
          Suggest
        </Button>

      {error && (
        <div className={styles.error}>
          <h4>Error during request, please try again</h4>
          <p>{error?.message}</p>
        </div>
      )}

      <p className={styles.description}>
        TBD TBD
      </p>
    </form>
  )
}
