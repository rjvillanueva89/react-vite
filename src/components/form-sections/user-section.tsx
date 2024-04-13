import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form"
import { FormInputs } from "../../pages/form"

interface Props<T extends FieldValues> {
  prefix: "borrower" | "spouse"
  register: UseFormRegister<T>
  control: Control<T>
  errors: FieldErrors<T>
}

export const UserSection = (props: Props<FormInputs>) => {
  const { prefix, register, control, errors } = props
  return (
    <>
      {prefix === "borrower" && (
        <div>
          <label htmlFor="isMarried">
            <input type="checkbox" {...register(`${prefix}.is_married`)} /> Are
            you married?
          </label>
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="First Name"
          {...register(`${prefix}.first_name`)}
        />
        <p>{errors[prefix]?.first_name?.message}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Last Name"
          {...register(`${prefix}.last_name`)}
        />
        <p>{errors[prefix]?.last_name?.message}</p>
      </div>
    </>
  )
}
