import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import "./index.css"
import { DatastorePage } from "./pages/datastore"
import { FormPage } from "./pages/form"
import { HomePage } from "./pages/home"
import { StepperPage } from "./pages/stepper"

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "stepper", element: <StepperPage /> },
  { path: "datastore", element: <DatastorePage /> },
  { path: "form", element: <FormPage /> },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
