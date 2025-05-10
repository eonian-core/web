import type { InputProps } from '@heroui/react'
import { Input } from '@heroui/react'
import type { Control, ControllerFieldState, ControllerRenderProps, RegisterOptions, UseFormStateReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'

export type FormInputProps = {
  name: string
  control: Control<any, any>
  rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
} & InputProps

interface RenderArgs {
  field: ControllerRenderProps<any, any>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<any>
}

export const FormInput: React.FC<FormInputProps> = ({ name, rules, errorMessage, ...props }) => {
  return (
    <Controller
      name={name}
      control={props.control}
      rules={rules}
      render={({ field, fieldState }: RenderArgs) => (
        <Input
          {...props}
          isRequired={!!rules?.required}
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error ? errorMessage : undefined}
          value={field.value as string}
          onChange={field.onChange}
                />
      )}
        ></Controller>
  )
}
