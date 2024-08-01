import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { ethers } from "ethers"
import Result from "@/layout/result.jsx"
import Header from "@/layout/header.jsx"
import Main from "@/layout/main.jsx"
import { useCheckStore } from "@/stores"
import { useContractionStore } from "../stores/contraction"
import { getFunctionFileName } from "../utils"

function Check() {
    const { currentFileFullName, fileContent, setFileContent, runCode, setRunCode } = useCheckStore()
    const { contract } = useContractionStore()

    const [runResult, setRunResult] = useState()
    const getFunDetail = async fullName => {
        if (contract && fullName) {
            const fileName = getFunctionFileName(fullName)
            const fileContentBuffer = await contract.getFiles(fileName)
            const fileContentJson = ethers.toUtf8String(fileContentBuffer)
            const fileContentObj = JSON.parse(fileContentJson)

            const [funcName, version] = fullName.split("@")
            setFileContent(decodeURIComponent(fileContentObj[funcName]))
        }
    }
    const runTestCode = testCode => {
        try {
            const functionBody = `
                ${fileContent || ""}
                const res = eval(\`${testCode || ""}\`)
                return res;
            `
            const execFun = new Function(functionBody)
            const result = execFun()
            setRunResult(result?.toString())
        } catch (e) {
            setRunResult(e.toString())
        }
    }
    useEffect(() => {
        getFunDetail(currentFileFullName)
    }, [currentFileFullName, contract])
    return (
        <Main>
            <Header hasSearch />
            <div className="flex flex-1 w-full h-[calc(100%-100px)]">
                <div className="flex-1 p-4 h-full text-gray-700">
                    <CodeMirror readOnly value={fileContent} className="h-full" height="100%" extensions={[javascript({ jsx: true })]} />
                </div>
                <Result code={runCode} onCodeChange={setRunCode} onRunClick={runTestCode} runResult={runResult} />
            </div>
        </Main>
    )
}

export default Check
