import { useContractionStore } from "../stores/contraction"
import { useCheckStore } from "../stores/check"

function Search() {
    const { contract } = useContractionStore()
    const { setCurrentFileFullName } = useCheckStore()
    const [keyword, setKeyword] = useState("uint8ArrayToByteStr")
    const [list, setList] = useState([])

    const getFunctionListByKeyWord = async kewWord => {
        if (contract && kewWord) {
            try {
                const funcList = await contract.getFullNamesOfAll(kewWord)
                setList(funcList)
            } catch (e) {
                console.error(e)
            }
        }
    }
    const handleSearchChange = e => {
        const keyword = e.target.value
        setKeyword(keyword)
        getFunctionListByKeyWord(keyword)
    }
    const handleListItemClick = funcName => {
        setList([])
        setCurrentFileFullName(funcName)
        setKeyword(funcName)
    }
    return (
        <div className="flex space-x-2 w-1/2">
            <div className="relative flex-1 ">
                <input
                    onChange={handleSearchChange}
                    value={keyword}
                    type="text"
                    placeholder="filename@version"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                />
                {list.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-slate-50 rounded z-10">
                        {list.map(i => (
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
                onClick={() => getFunctionListByKeyWord(keyword)}
            >
                Search
            </button>
        </div>
    )
}
export default function Header({ hasSearch }) {
    return (
        <header className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold py-4 flex items-center justify-between px-4 h-20">
            <span>Welcome to Web3-Packages Demo</span>
            {hasSearch && <Search />}
            <a href="https://github.com/Web3Packages/UI">
                <img src="https://github.githubassets.com/favicons/favicon.svg" alt="github" />
            </a>
        </header>
    )
}
