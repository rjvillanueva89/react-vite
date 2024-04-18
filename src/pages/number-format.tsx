import { useState } from "react"
import { InputAttributes } from "react-number-format"
import { CurrencyInput } from "../components/currency-input"

const Input = (props: InputAttributes) => {
  console.log(props)

  return <input {...props} placeholder="amount" />
}

export const NumberFormat = () => {
  const [value, setValue] = useState<number | undefined>(2500)

  console.log(value)

  return (
    <CurrencyInput
      value={value}
      onValueChange={(values) => setValue(values.floatValue)}
      customInput={Input}
    />
  )
}
