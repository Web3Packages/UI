import { create } from "zustand"

export const useSearchStore = create(set => ({
    fileRaw: "const a = 1 \nconst b = 2 \nconsole.log(a + b)",
    searchFile: fileRaw => set(() => ({ fileRaw })),
}))

