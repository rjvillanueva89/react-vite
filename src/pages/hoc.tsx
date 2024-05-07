import { withAuth } from "../utils/withAuth"

interface Props {
  someString: string
}

const Component = ({ someString }: Props) => {
  console.log(someString)

  return <>Rendered Component</>
}

export const HOCPage = withAuth(Component)
