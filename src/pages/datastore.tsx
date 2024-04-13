import { useDatastore } from "../hooks/use-datastore"

export const DatastorePage = () => {
  const data = useDatastore()

  console.log(data)

  return null
}
