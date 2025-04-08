import type { FormErrorProps, OneInputFormProps } from '../one-input-form/one-input-form'
import { BaseFormError, FormHeader, FrictionRemover, OneInputForm, SimpleFormInput, Submit } from '../one-input-form/one-input-form'
import { socialsMap } from '@/socials'

export function SuggestChainForm(props: OneInputFormProps) {
  return (
    <OneInputForm {...props}>
      <FormHeader>
        <h3>What chains do you use?</h3>
      </FormHeader>

      <SimpleFormInput
        type="text"
        placeholder="Polygon, Arbitrum, ..."
        labelPlacement="inside"
        rules={{ required: true }}
        errorMessage={<span>Please enter what chains do you use?</span>}
      />

      <Submit>
        Suggest
      </Submit>

      <FrictionRemover>
        We working on adding more, you can share chains that we missing and we will prioritize it.
      </FrictionRemover>
    </OneInputForm>
  )
}

export function SuggestionFormError({ error }: FormErrorProps) {
  if (!error)
    return null

  return (
    <BaseFormError>
      <h4>😥 Error during saving your suggestion</h4>
      <p>Please share it with us on <a href={socialsMap.en.Discord.href}>Discord</a> or <a href={socialsMap.en.Telegram.href}>Telegram</a>.</p>
      <p>We want to hear it!</p>
    </BaseFormError>
  )
}
