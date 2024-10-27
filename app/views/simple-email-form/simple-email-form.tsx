import type { FormErrorProps, OneInputFormProps } from '../one-input-form/one-input-form'
import { BaseFormError, FormHeader, FrictionRemover, OneInputForm, SimpleFormInput, Submit } from '../one-input-form/one-input-form'
import { emailPattern } from '@/validators'
import IconEmail from '@/components/icons/icon-email'
import { socialsMap } from '@/socials'

export function SimpleEmailForm(props: OneInputFormProps) {
  return (
    <OneInputForm {...props}>
      <FormHeader success>
        <h3>Thank you!</h3>
        <p>We will work on it and can notify you when it’s added.</p>
      </FormHeader>

      <SimpleFormInput
        type="email"
        placeholder="love@eonian.finance"
        rules={{ required: true, pattern: emailPattern }}
        startContent={<IconEmail />}
        errorMessage={<span>Please enter a valid email address</span>}
      />

      <Submit>
        Get me know
      </Submit>

      <FrictionRemover>
        We don’t share it with anyone
      </FrictionRemover>

    </OneInputForm>
  )
}

export function SimpleEmailFormError({ error }: FormErrorProps) {
  if (!error)
    return null

  return (
      <BaseFormError>
        <h4>😥 Error during saving your email</h4>
        <p>Please share it with us on <a href={socialsMap.en.Discord.href}>Discord</a> or <a href={socialsMap.en.Telegram.href}>Telegram</a>.</p>
        <p>We want to hear about you!</p>
      </BaseFormError>
  )
}
