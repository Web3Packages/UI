import { create } from "zustand"

export const useCheckStore = create(set => ({
    fileContent: "",
    setFileContent: fileContent => set(() => ({ fileContent })),
    currentFileFullName: undefined,
    setCurrentFileFullName: fullName => set(() => ({ currentFileFullName: fullName })),
    runCode: "",
    setRunCode: code => set(() => ({ runCode: code })),
}))

