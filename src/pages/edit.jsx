import { Coding, Header, Main, Result } from "@/layout"
import { useContractionStore, useEditStore } from "@/stores"
import { writeFile } from "@/libs/writeFile.js"
import useCoding from "@/hooks/useCoding.js"

function Edit() {
    const { fileRaw, setFileRaw } = useEditStore()
    const { code: [code, setCode], results: [results], handleExecute } = useCoding(fileRaw)
    const { contract } = useContractionStore()

    async function handlePushCode() {
        if (!contract || !fileRaw) {
            return
        }
        const filename = "testFoo@0.0.1"
        await writeFile(filename, fileRaw, contract)
    }

    return (
        <Main>
            <Header />
            <div className="flex flex-1 w-full h-[calc(100%-80px)]">
                <Coding value={fileRaw} onChange={value => setFileRaw(value)} />
                <ul className="grid grid-cols-1 h-fit *:cursor-pointer *:p-3">
                    <li onClick={handleExecute}><img src="/assets/icons/Action.svg" alt="run code" /></li>
                    <li onClick={handlePushCode}><img src="/assets/icons/Upload.svg" alt="push code" /></li>
                </ul>
                <div className="flex flex-col gap-4 mr-2 w-1/4">
                    <Coding value={code} onChange={value => setCode(value)} className="flex-6" />
                    <Result results={results} />
                </div>
            </div>
        </Main>
    )
}

export default Edit
