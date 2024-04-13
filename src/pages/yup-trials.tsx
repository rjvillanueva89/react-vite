import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { UserSection } from "../components/form-sections/user-section"

const FormSchema = yup.object().shape({
  is_married: yup.boolean(),
  borrower_first_name: yup.string().required(),
  borrower_last_name: yup.string().required(),
  spouse_first_name: yup.string().when("is_married", ([is_married], schema) => {
    console.log(is_married)
    return is_married ? schema.required() : schema.optional()
  }),
  spouse_last_name: yup.string().when("is_married", ([is_married], schema) => {
    console.log(is_married)
    return is_married ? schema.required() : schema.optional()
  }),
})

export type FormInputs = yup.InferType<typeof FormSchema>

export const YupTrials = () => {
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(FormSchema),
    shouldUnregister: true,
    defaultValues: { is_married: false },
  })

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
