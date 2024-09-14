import useConsole from "@/hooks/useConsole"

export default function useCoding(fileRaw) {
    const [results, setResults] = useState(["The results will be displayed here."])
    const [code, setCode] = useState(`const code = 'return (leftcode)'\nconst fn = new Function(code);\nconst runTest = fn();\nrunTest('111');
`)

    function handleExecute() {
        const runCode = fileRaw + "\n" + code.replace(/leftcode/g, String(fileRaw.replace(/\n/g, '')))
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
