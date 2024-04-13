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
  const { prefix, register, errors } = props
  return (
    <>
      {prefix === "borrower" && (
        <div>
          <label htmlFor="isMarried">
            <input type="checkbox" {...register(`is_married`)} />
            Are you married?
          </label>
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="First Name"
          {...register(`${prefix}_first_name`)}
        />
        <p>{errors?.[`${prefix}_first_name`]?.message}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Last Name"
          {...register(`${prefix}_last_name`)}
        />
        <p>{errors?.[`${prefix}_last_name`]?.message}</p>
      </div>
    </>
  )
}
