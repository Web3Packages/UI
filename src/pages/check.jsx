import Coding from "@/layout/coding.jsx"
import Result from "@/layout/result.jsx"
import Header from "@/layout/header.jsx"
import Main from "@/layout/main.jsx"

function Check() {

    return (
        <Main>
            <Header />
            <div className="flex flex-1 w-full h-[calc(100%-100px)]">
                <Coding />
                <Result />
            </div>
        </Main>
    )
}

export default Check
