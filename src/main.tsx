import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import "./index.css"
import { DatastorePage } from "./pages/datastore"
import { HOCPage } from "./pages/hoc"
import { HomePage } from "./pages/home"
import { NumberFormat } from "./pages/number-format"
import { StepperPage } from "./pages/stepper"
import { YupTrials } from "./pages/yup-trials"
import { YupTrialsNesting } from "./pages/yup-trials-nesting"
import { ZodEnumTrials } from "./pages/zod-enum-trials"
import { ZodTrials } from "./pages/zod-trials"

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "stepper", element: <StepperPage /> },
  { path: "datastore", element: <DatastorePage /> },
  { path: "yup-trials", element: <YupTrials /> },
  { path: "yup-trials/nesting", element: <YupTrialsNesting /> },
  { path: "zod-trials", element: <ZodTrials /> },
  {
    path: "zod-trials/enum",
    element: <ZodEnumTrials />,
  },
  { path: "number-format", element: <NumberFormat /> },
  { path: "hoc", element: <HOCPage someString="some string" /> },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
