import { useState } from "react"
import "./App.css"

type StepperData = {
  name?: string
  age?: Date
}

function App() {
  const [data, setData] = useState<StepperData>()

  console.log(data)

  const storeData = (newData: StepperData) => {
    setData((current) => ({ ...current, ...newData }))
  }

  return <button onClick={() => storeData({ age: new Date() })}>button</button>
}

export default App
