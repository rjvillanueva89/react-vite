import { zodResolver } from "@hookform/resolvers/zod"
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useForm,
} from "react-hook-form"
import { z } from "zod"

const CIVIL_STATUS = ["Married", "Single", "Others"] as const

const UserFieldsSchema = {
  first_name: z.string().min(1, "This field is required"),
  last_name: z.string().min(1, "This field is required"),
}

const DefaultSchema = z.object({
  civil_status: z.enum(CIVIL_STATUS, {
    errorMap: () => ({ message: "This field is required" }),
  }),
  borrower: z.object({
    ...UserFieldsSchema,
  }),
})

const IsMarriedSchema = z.discriminatedUnion("civil_status", [
  z.object({
    civil_status: z.enum(["Married"]),
    spouse: z.object({
      ...UserFieldsSchema,
    }),
  }),
  z.object({
    civil_status: z.enum(["Single", "Others"]),
  }),
])

const FormSchema = z.intersection(DefaultSchema, IsMarriedSchema)

type FormInputs = z.infer<typeof FormSchema>

export const ZodEnumTrials = () => {
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: zodResolver(FormSchema) })

  const onSubmit = handleSubmit((data) => console.log(data))

  const isMarried = watch("civil_status") === "Married"

  console.log(errors)
  return (
    <form onSubmit={onSubmit}>
      <select {...register("civil_status")}>
        <option value="">Select civil status</option>
        {CIVIL_STATUS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
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
