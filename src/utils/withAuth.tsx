import { ComponentType } from "react"

export const withAuth = <T extends object>(Component: ComponentType<T>) => {
  const AuthorizedComponent = (props: T) => {
    console.log("hoc logic goes here")

    return <Component {...props} />
  }

  return AuthorizedComponent
}
