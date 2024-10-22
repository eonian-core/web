import type { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import styles from './suggest-chain-drawer.module.scss'
import { FormInput } from '@/components/form-input/form-input'
import Button from '@/components/button/button'

export interface SuggestChainFormInput {
  chain: string
}

export interface SuggestChainFormProps {
  onSubmit: (data: SuggestChainFormInput) => void | Promise<void>
  success?: boolean
  loading?: boolean
  error?: Error | null
}

export function SuggestChainForm({
  onSubmit,
  loading,
  success,
  error,
}: SuggestChainFormProps) {
  const { control, handleSubmit, formState } = useForm<SuggestChainFormInput>()

  const fullFormDisabled = loading || success

  return (
    <form onSubmit={handleSubmit(onSubmit) as FormEventHandler<any>} className={styles.form}>
      <div className={styles.header}>
        <h3>What chain do you use?</h3>
      </div>

      <FormInput
        data-autofocus
        name="chain"
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
        TBD TBD // TODO set correct text
      </p>
    </form>
  )
}
