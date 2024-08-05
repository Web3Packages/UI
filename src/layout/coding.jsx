import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"

export default function Coding({ code, setCode }) {
    return (
        <div className="flex-1 p-4 h-full text-gray-700">
            <CodeMirror value={code} className="h-full" height="100%" extensions={[javascript({ jsx: true })]} onChange={(value) => setCode(value)} />
        </div>
    )
}
