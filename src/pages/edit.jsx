import Header from "@/layout/header.jsx"
import Result from "@/layout/result.jsx"
import Coding from "@/layout/coding.jsx"
import Main from "@/layout/main.jsx"

function Edit() {
    const fileRaw = "test code"
    return (
        <Main>
            <Header />
            <div className="flex flex-1 w-full h-[calc(100%-100px)]">
                <Coding fileRaw={fileRaw} />
                <Result />
            </div>
        </Main>
    )
}

export default Edit
