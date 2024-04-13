import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { UserSection } from "../components/form-sections/user-section"

const FormSchema = yup.object({
  borrower: yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    is_married: yup.boolean().default(false),
  }),
  spouse: yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
  }),
})

export type FormInputs = yup.InferType<typeof FormSchema>

export const FormPage = () => {
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(FormSchema) })

  const onSubmit = handleSubmit((data) => console.log(data))

  const isMarried = watch("borrower.is_married")

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
