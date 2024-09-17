import useConsole from "@/hooks/useConsole"

export default function useCoding(fileRaw) {
    const [results, setResults] = useState(["The results will be displayed here."])
    const [code, setCode] = useState(`const code =\`leftcode return [foo]\`;\nconst fn = new Function(code);\nconst [foo] = fn();\nfoo("hello");`)

    function handleExecute() {
        // const formatCode = code.replace(/leftcode/g, String(fileRaw.replace(/\n/g, '')))
        const formatCode = code.replace(/leftcode/g, String(fileRaw))
        console.log(formatCode, '000')
        const fn = new Function(formatCode)
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
