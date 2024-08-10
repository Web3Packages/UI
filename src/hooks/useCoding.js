import useConsole from "@/hooks/useConsole.js"

export default function useCoding(fileRaw) {
    const [results, setResults] = useState(["The results will be displayed here."])
    const [code, setCode] = useState(`const runTest = foo()\nconsole.log(runTest)`)

    function handleExecute() {
        const runCode = fileRaw + "\n" + code
        const fn = new Function(runCode)
        try {
            const result = useConsole(fn)
            setResults(result)
        } catch (e) {
            setResults([e])
        }
    }

    return {
        code: [code, setCode],
        results: [results, setResults],
        handleExecute,
    }
}
