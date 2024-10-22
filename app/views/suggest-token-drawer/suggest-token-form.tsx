import type { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import styles from './suggest-token-drawer.module.scss'
import { FormInput } from '@/components/form-input/form-input'
import Button from '@/components/button/button'

export interface SuggestTokenFormInput {
  token: string
}

export interface SuggestTokenFormProps {
  onSubmit: (data: SuggestTokenFormInput) => void | Promise<void>
  success?: boolean
  loading?: boolean
  error?: Error | null
}

export function SuggestTokenForm({
  onSubmit,
  loading,
  success,
  error,
}: SuggestTokenFormProps) {
  const { control, handleSubmit, formState } = useForm<SuggestTokenFormInput>()

  const fullFormDisabled = loading || success

  return (
    <form onSubmit={handleSubmit(onSubmit) as FormEventHandler<any>} className={styles.form}>
      <div className={styles.header}>
        <h3>What token do you use?</h3>
      </div>

      <FormInput
        data-autofocus
        name="token"
        control={control}
        type="text"
        placeholder="DAI, XRP, TRON,..."
        labelPlacement="inside"
        className={styles.input}
        variant="bordered"
        disabled={fullFormDisabled}
        rules={{ required: true }}
        errorMessage={<span>Please enter what token do you use?</span>}
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
        We working on adding more, you can share tokens that we missing and we will prioritize it.
      </p>
    </form>
  )
}
