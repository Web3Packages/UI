import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"

export default function Coding({ className, ...props }) {
    return (
        <div className={`flex-1 text-gray-700 ${className}`}>
            <CodeMirror className="h-full" height="100%" {...props} extensions={[javascript({ jsx: true })]} />
        </div>
    )
}
