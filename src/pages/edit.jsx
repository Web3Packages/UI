import { Coding, Header, Main, Result } from "@/layout"
import ResultForEdit from "@/layout/ResultForEdit.jsx"

function Edit() {
    const tip = "/*\n" +
        "    目前已支持传入以下JavaScript函数任一一种：\n" +
        "    1.\n" +
        "    function 函数名(参1, 参2, ...) {\n" +
        "        return\n" +
        "    }\n" +
        "\n" +
        "    2.\n" +
        "    const 函数名 = (参1, 参2, ...) => {\n" +
        "        return\n" +
        "    }\n" +
        "\n" +
        "    3.\n" +
        "    let 函数名 = function(参1, 参2, ...) {\n" +
        "        return\n" +
        "    }\n" +
        "*/" +
        '\n' +
        '\n'
    const [code, setCode] = useState(tip);

    return (
        <Main>
            <Header />
            <div className="flex flex-1 w-full h-[calc(100%-100px)]">
                <Coding code={code} setCode={setCode} />
                <ResultForEdit code={code} />
            </div>
        </Main>
    )
}

export default Edit
