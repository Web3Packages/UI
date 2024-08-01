import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"

export default function Result(props) {
    const noop = () => {}
    const { code, onCodeChange = noop, onRunClick = noop, runResult = "The results will be displayed here." } = props

    return (
        <div className="flex flex-col w-1/3 p-4 space-y-4 result">
            <div className="relative flex-1">
                <button
                    onClick={() => onRunClick(code)}
                    className="absolute top-2 right-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150 ease-in-out z-10"
                >
                    Run
                </button>
                <div className="text-gray-700">
                    <CodeMirror
                        value={code}
                        height="470px"
                        extensions={[javascript({ jsx: true })]}
                        onChange={value => onCodeChange(value)}
                    />
                </div>
            </div>

            {/* Run Results Area */}
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 h-[300px] overflow-auto">
                <div className="text-gray-800 text-lg font-semibold">运行结果</div>
                <div className="mt-2 text-gray-600">{runResult}</div>
            </div>
        </div>
    )
}
