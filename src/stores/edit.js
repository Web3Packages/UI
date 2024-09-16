import { create } from "zustand"

const tip = `
/*
Examples：
function foo(p1, p2, ...) { // Recommend
    return
}

const bar = (p1, p2, ...) => {
    return
}
*/

function foo(params) {
  console.log("test:", params.toString())
}

function foo2() {
  console.log("foo2");
}
`

export const useEditStore = create(set => ({
    fileRaw: tip,
    setFileRaw: fileRaw => set(() => ({ fileRaw })),
}))
