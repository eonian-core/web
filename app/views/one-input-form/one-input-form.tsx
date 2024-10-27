import type { FormEventHandler } from 'react'
import { createContext, useContext } from 'react'
import type { Control, FormState } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import styles from './one-input-form.module.scss'
import type { FormInputProps } from '@/components/form-input/form-input'
import { FormInput } from '@/components/form-input/form-input'
import type { ButtonProps } from '@/components/button/button'
import Button from '@/components/button/button'

export interface OneInputFormState {
  input: string
}

export interface OneInputFormProps extends Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: OneInputFormState) => void | Promise<void>
  success?: boolean
  loading?: boolean
  disabled?: boolean
  error?: Error | any | null
}

export interface OneInputFormContextProps {
  control: Control<OneInputFormState, any>
  formState: FormState<OneInputFormState>
  success?: boolean
  loading?: boolean
  disabled?: boolean
}

const OneInputFormContext = createContext<OneInputFormContextProps | undefined>(undefined)

export function useOneFormContext(): OneInputFormContextProps {
  const context = useContext(OneInputFormContext)
  if (!context)
    throw new Error('useOneFormContext must be used within a OneInputFormContext')

  return context
}

/** Base for one input form that can be used inside of */
export function OneInputForm({
  className,
  onSubmit,
  loading,
  success,
  disabled,
  children,
  error,
  ...props
}: OneInputFormProps) {
  const { control, handleSubmit, formState } = useForm<OneInputFormState>()

  const fullFormDisabled = loading || success || disabled

  return (
        <form
            className={clsx(styles.form, className)}
            onSubmit={handleSubmit(onSubmit) as FormEventHandler<any>}
            {...props}
        >
            <OneInputFormContext.Provider value={{ control, formState, success, loading, disabled: fullFormDisabled }}>
                {children}

                <FormError error={error as Error} />
            </OneInputFormContext.Provider>
        </form>
  )
}

export interface FormHeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  success?: boolean
}

export function FormHeader({ className, success, ...props }: FormHeaderProps) {
  return (
        <div className={clsx(styles.header, className, { [styles.success]: success })} {...props} />
  )
}

export function SimpleFormInput({ className, ...props }: Omit<FormInputProps, 'name' | 'control'>) {
  const { control, disabled } = useOneFormContext()
  return (
        <FormInput
            data-autofocus
            variant="bordered"
            className={clsx(styles.input, className)}
            name="input"
            control={control}
            disabled={disabled}
            {...props}
        />
  )
}

export function Submit({ className, ...props }: ButtonProps) {
  const { success, formState, disabled } = useOneFormContext()
  return (
        <Button
            gradient
            wide
            size="lg"
            className={clsx(styles.button, { [styles.success]: success }, className)}
            type="submit"
            disabled={!formState.isValid || disabled}
            {...props}
        />
  )
}

export function FrictionRemover({ className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  return <p className={clsx(styles.frictionRemover, className)} {...props} />
}

export interface FormErrorProps {
  error?: Error | any | null
}

export function FormError({ error }: FormErrorProps) {
  if (!error)
    return null

  const message = typeof error === 'object' ? (error as Error).message : error as string

  return (
        <div className={styles.error}>
          <h4>Error during request, please try again</h4>
          <p>{message}</p>
        </div>
  )
}
