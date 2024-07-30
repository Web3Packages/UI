import { create } from "zustand"

export const useContractionStore = create(set => ({
    contract: null,
    setContract: contract => set({ contract }),
}))
