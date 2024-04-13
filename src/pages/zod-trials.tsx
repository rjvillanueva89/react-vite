import { zodResolver } from "@hookform/resolvers/zod"
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useForm,
} from "react-hook-form"
import { z } from "zod"

const UserSchema = {
  first_name: z.string().min(1, "This field is required"),
  last_name: z.string().min(1, "This field is required"),
}

const DefaultSchema = z.object({
  borrower: z.object({
    ...UserSchema,
  }),
})

const IsMarriedSchema = z.discriminatedUnion("is_married", [
  z.object({
    is_married: z.literal(true),
    spouse: z.object({
      ...UserSchema,
    }),
  }),
  z.object({
    is_married: z.literal(false),
  }),
])

const FormSchema = z.intersection(DefaultSchema, IsMarriedSchema)

type FormInputs = z.infer<typeof FormSchema>

export const ZodTrials = () => {
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: zodResolver(FormSchema) })

  const onSubmit = handleSubmit((data) => console.log(data))

  const isMarried = watch("is_married")

  console.log(errors)
  return (
    <form onSubmit={onSubmit}>
      <label>
        <input type="checkbox" {...register("is_married")} /> Are you married?
      </label>
      <UserFields
        prefix="borrower"
        register={register}
        control={control}
        errors={errors}
      />
      {isMarried && (
        <UserFields
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

type FieldPrefix = "borrower" | "spouse"

interface Props<T extends FieldValues> {
  prefix: FieldPrefix
  register: UseFormRegister<T>
  control: Control<T>
  errors: FieldErrors<T>
}

const UserFields = (props: Props<FormInputs>) => {
  const { prefix, register } = props
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="first name"
          {...register(`${prefix}.first_name`)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="first name"
          {...register(`${prefix}.last_name`)}
        />
      </div>
    </>
  )
}
