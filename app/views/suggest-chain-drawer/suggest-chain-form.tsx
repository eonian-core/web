import type { OneInputFormProps } from '../one-input-form/one-input-form'
import { FormHeader, FrictionRemover, OneInputForm, SimpleFormInput, Submit } from '../one-input-form/one-input-form'

export function SuggestChainForm(props: OneInputFormProps) {
  return (
    <OneInputForm {...props}>
      <FormHeader>
        <h3>What chains do you use?</h3>
      </FormHeader>

      <SimpleFormInput
        type="text"
        placeholder="Poligon, Airbitrum, ..."
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
