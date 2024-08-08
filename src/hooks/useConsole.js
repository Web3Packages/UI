import { isArray } from "@/utils/is.js"

const originalLog = console.log

export default function useConsole(fn) {

    const logStore = []
    console.log = function() {
        const args = Array.from(arguments)
        let str = ""
        for (const arg of args) {
            if (typeof arg === "object" || isArray(arg)) {
                str += JSON.stringify(arg)
            } else {
                str += arg
            }
        }
        logStore.push(str)

        originalLog.apply(console, arguments)
    }

    try {
        fn()
    } catch (e) {
        logStore.push(e.toString())
    }
    console.log = originalLog

    return logStore
}
