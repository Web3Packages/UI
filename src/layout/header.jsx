export default function Header({ hasSearch }) {
    const inputRef = useRef(null)

    function handleSearch() {
        const value = inputRef.current.value
        console.log(value)
    }

    return (
        <header
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold py-4 flex items-center justify-between px-4 h-20">
            <span>Welcome to Web3-Packages Demo</span>
            {hasSearch && (
                <div className="flex space-x-2">
                    <input
                        type="text" placeholder="filename@version" ref={inputRef}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                    />
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150 ease-in-out"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            )}
            <a href="https://github.com/Web3Packages/UI">
                <img src="https://github.githubassets.com/favicons/favicon.svg" alt="github"/>
            </a>
        </header>
    )
}
