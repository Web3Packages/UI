import { Result, Header, Main, Coding } from "@/layout"
import useCoding from "@/hooks/useCoding.js"

function Check() {
    const [fileRaw, setFileRaw] = useState("function foo(){ // Hello Web3 \n \n return {a:1,b:{c:2} ,d:[{haha:'hello'}]} \n}")
    const { code: [code, setCode], results: [results], handleExecute } = useCoding(fileRaw)

    return (
        <Main>
            <Header hasSearch setFileRaw={setFileRaw}/>
            <div className="flex flex-1 w-full h-[calc(100%-80px)]">
                <div className="relative flex-1">
                    <Coding value={fileRaw} readOnly className="h-full" />
                    <div className="absolute inset-0 backdrop-blur-lg bg-slate-50 opacity-50" />
                </div>
                <ul className="grid grid-cols-1 h-fit *:cursor-pointer *:p-3">
                    <li onClick={handleExecute}><img src="/assets/icons/Action.svg" alt="run code" /></li>
                </ul>
                <div className="flex flex-col gap-4 mr-2 w-1/4 h-full">
                    <Coding value={code} onChange={value => setCode(value)} className="flex-6 h-full" />
                    <Result results={results} />
                </div>
            </div>
        </Main>
    )
}

export default Check
