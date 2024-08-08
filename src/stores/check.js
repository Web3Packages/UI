import { create } from "zustand"

export const useCheckStore = create(set => ({
    fileData: "",
    setFileData: fileData => set({ fileData }),
}))
