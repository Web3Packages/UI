import { useLocation, useNavigate, useRoutes } from "react-router-dom"
import { Tooltip } from "@/components/Tooltip"
import { useContractionStore } from "@/stores"
import { getFileList, readFile } from "@/libs/readFile"
import { Button } from "@/components/Button.jsx"

function Search({ setFileRaw }) {
    const [files, setFiles] = useState([])
    const { contract } = useContractionStore()
    const inputRef = useRef(null)

    async function getFile(fullName) {
        if (!contract || !fullName) {
            return null
        }
        return await readFile(fullName, contract)
    }

    async function getFilenames(fullName) {
        if (!contract || !fullName) {
            return null
        }
        return await getFileList(fullName, contract)
    }

    function handleSearch() {
        const value = inputRef.current.value
        getFilenames(value).then(res => res && setFiles(res))
    }

    function handleListItemClick(funcName) {
        setFiles([])
        getFile(funcName, contract).then(res => setFileRaw(res))
        inputRef.current.value = funcName
    }

    return (
        <div className="flex space-x-2 w-1/2">
            <div className="relative flex-1 ">
                <input
                    onChange={handleSearch}
                    type="text" ref={inputRef}
                    placeholder="filename@version"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                />
                {files.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-slate-50 rounded z-10">
                        {files.map(i => (
                            <div
                                key={i}
                                onClick={() => handleListItemClick(i)}
                                className="h-12 p-2 leading-8 border-b cursor-pointer text-gray-400 text-sm"
                            >
                                {i}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150 ease-in-out"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    )
}

export default function Header({ hasSearch, setFileRaw }) {
    const navigate = useNavigate()

    const handleButtonClick = path => {
        navigate(path)
    }
    // const routes = useRoutes()
    // console.log(routes)
    const { pathname } = useLocation()
    const isEdit = pathname === "/edit"
    const isCheck = pathname === "/check"

    const route = useMemo(() => isEdit && "/check" || isCheck && "/edit", [pathname])
    return (
        <header
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold py-4 flex items-center justify-between px-4 h-20">
            <Tooltip text="back to home" position="top">
                <span onClick={() => handleButtonClick("/")}
                      className="cursor-pointer select-none">Welcome to Web3-Packages Demo</span>
            </Tooltip>
            {hasSearch && <Search setFileRaw={setFileRaw} />}
            <Button onClick={() => handleButtonClick(route)}> Go to {route.replace("/", "")}   </Button>
            <a href="https://github.com/Web3Packages/UI" target="_blank" title="github repo">
                <img src="https://github.githubassets.com/favicons/favicon.svg" alt="github" />
            </a>
        </header>
    )
}
