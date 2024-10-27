import type { OneInputFormProps } from '../one-input-form/one-input-form'
import { FormHeader, FrictionRemover, OneInputForm, SimpleFormInput, Submit } from '../one-input-form/one-input-form'

export function SuggestTokenForm(props: OneInputFormProps) {
  return (
    <OneInputForm {...props}>
      <FormHeader>
        <h3>What token do you use?</h3>
      </FormHeader>

      <SimpleFormInput
        type="text"
        placeholder="DAI, XRP, TRON,..."
        labelPlacement="inside"
        rules={{ required: true }}
        errorMessage={<span>Please enter what token do you use?</span>}
      />

      <Submit>
        Suggest
      </Submit>

      <FrictionRemover>
        We working on adding more, you can share tokens that we missing and we will prioritize it.
      </FrictionRemover>
    </OneInputForm>
  )
}
