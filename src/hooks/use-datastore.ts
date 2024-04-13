import { create } from "zustand"

type Datastore = {
  data: Record<string, unknown>
  setData: (newData: Record<string, unknown>) => void
}

export const useDatastore = create<Datastore>()((set) => ({
  data: {},
  setData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
}))
