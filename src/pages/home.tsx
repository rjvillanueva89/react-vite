import { useState } from "react"

type StepperData = {
  name?: string
  age?: Date
}

export const HomePage = () => {
  const [data, setData] = useState<StepperData>()

  console.log(data)

  const storeData = (newData: StepperData) => {
    setData((current) => ({ ...current, ...newData }))
  }

  return <button onClick={() => storeData({ age: new Date() })}>button</button>
}
