import Header from "@/layout/header.jsx"
import Result from "@/layout/result.jsx"
import Coding from "@/layout/coding.jsx"
import Main from "@/layout/main.jsx"

function Edit() {

    return (
        <Main>
            <Header hasSearch />
            <div className="flex flex-1 w-full h-[calc(100%-100px)]">
                <Coding />
                <Result />
            </div>
        </Main>
    )
}

export default Edit
