import { yupResolver } from "@hookform/resolvers/yup"
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useForm,
} from "react-hook-form"
import * as yup from "yup"

const UserSchema = (isRequired?: boolean) => ({
  first_name: isRequired ? yup.string().required() : yup.string(),
  last_name: isRequired ? yup.string().required() : yup.string(),
})

const FormSchema = yup.object({
  is_married: yup.boolean(),
  borrower: yup.object({
    ...UserSchema(true),
  }),
  spouse: yup
    .object({
      ...UserSchema(),
    })
    .when("is_married", ([is_married], schema) => {
      console.log(is_married)

      return is_married
        ? yup.object({
            ...UserSchema(true),
          })
        : schema
    }),
})

export type FormInputs = yup.InferType<typeof FormSchema>

export default function Form2Page() {
  const {
    handleSubmit,
    watch,
    register,
    control,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(FormSchema) })

  const onSubmit = handleSubmit((data) => console.log(data))

  const isMarried = watch("is_married")

  console.log(errors)
  return (
    <form onSubmit={onSubmit}>
      <UserSection
        prefix="borrower"
        register={register}
        control={control}
        errors={errors}
      />
      {isMarried && (
        <UserSection
          prefix="spouse"
          register={register}
          control={control}
          errors={errors}
        />
      )}
      <button type="submit">Submit</button>
    </form>
  )
}

interface Props<T extends FieldValues> {
  prefix: "borrower" | "spouse"
  register: UseFormRegister<T>
  control: Control<T>
  errors: FieldErrors<T>
}

const UserSection = (props: Props<FormInputs>) => {
  const { prefix, register, errors } = props
  return (
    <>
      {prefix === "borrower" && (
        <>
          <div>
            <label htmlFor="isMarried">
              <input type="checkbox" {...register(`is_married`)} />
              Are you married?
            </label>
          </div>
        </>
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
