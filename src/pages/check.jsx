import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { ethers } from "ethers"
import { Result, Header, Main } from "@/layout"
import { useCheckStore, useContractionStore } from "@/stores"
import { getFunctionFileName, fakeConsole } from "@/utils"

function Check() {
    const { currentFileFullName, fileContent, setFileContent, runCode, setRunCode } = useCheckStore()
    const { contract } = useContractionStore()

    const [runResult, setRunResult] = useState([])
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
        setRunResult([])
        fakeConsole(
            log => {
                setRunResult(oldLog => [
                    ...oldLog,
                    <span>
                        {log}
                        <br />
                    </span>,
                ])
            },
            () => {
                try {
                    const functionBody = `
                    ${fileContent || ""};
                    ${testCode || ""}
                `
                    new Function(functionBody)()
                } catch (e) {
                    setRunResult(e.toString())
                }
            },
        )
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
