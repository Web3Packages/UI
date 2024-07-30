import { Coding, Header, Main, Result } from "@/layout"

function Edit() {
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

export default Edit
