import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import "./index.css"
import { DatastorePage } from "./pages/datastore"
import { HomePage } from "./pages/home"
import { StepperPage } from "./pages/stepper"
import { YupTrials } from "./pages/yup-trials"
import { YupTrialsNesting } from "./pages/yup-trials-nesting"

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "stepper", element: <StepperPage /> },
  { path: "datastore", element: <DatastorePage /> },
  { path: "yup-trials", element: <YupTrials /> },
  { path: "yup-trials-nesting", element: <YupTrialsNesting /> },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
