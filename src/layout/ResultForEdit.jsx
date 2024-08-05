import parseCode from "@/utils/parceCode.js"

export default function ResultForEdit(props) {
    const { code } = props
    const [params, setParams] = useState([]);
    const [fun, setFun] = useState(null);
    const [isRunEnabled, setIsRunEnabled] = useState(false);
    const [runResult, setRunResult] = useState("The results will be displayed here.");

    useEffect(() => {
        if (fun && Array.isArray(fun.params)) {
            setParams(fun.params.map(param => ''));
        }
    }, [fun]);

    const handleParse = () => {
        const parsedFun = parseCode(code);
        setFun(parsedFun);
        setIsRunEnabled(true); // 解析后启用运行按钮
    };

    const handleRun = () => {
        // 检查所有参数是否有值
        const allFilled = params.every(param => param.trim() !== '');

        if (allFilled) {
            // 所有参数都有值，可以执行运行逻辑
            try {
                // 创建新的函数并执行
                const func = new Function(...fun.params, `
                    ${code}
                    return ${fun.name}(${fun.params.join(', ')});
                `);
                const result = func(...params);
                setRunResult(result);
            } catch (error) {
                alert('执行函数时出错，请检查代码');
            }
        } else {
            // 参数有缺失，显示错误信息
            alert('请填写所有参数值');
        }
    };

    const handleChange = (index, value) => {
        const newParams = [...params];
        newParams[index] = value;
        setParams(newParams);
    };

    return (
        <div className="flex flex-col w-1/3 p-4 space-y-4 result">
            <div className="relative flex-1 bg-white rounded-lg shadow border border-gray-200 overflow-auto">
                {/*按钮组*/}
                <div className="flex justify-between">
                    <button
                        onClick={handleParse}
                        className="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150 ease-in-out z-10"
                    >解析
                    </button>
                    <button
                        onClick={handleRun}
                        disabled={!isRunEnabled}
                        className={`m-2 px-4 py-2 ${isRunEnabled ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700" : "bg-blue-500 opacity-50 cursor-not-allowed"} text-white rounded transition duration-150 ease-in-out z-10`}
                    >运行
                    </button>
                    <button
                        className="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150 ease-in-out z-10 opacity-50 cursor-not-allowed"
                    >发布
                    </button>
                </div>
                {/*链上方法名、版本号*/}
                <div className="flex mt-2">
                    <div className="flex-1 flex flex-col m-2">
                        <label htmlFor="method-name" className="mb-2 font-semibold">链上方法名</label>
                        <input id="method-name" type="text"
                               className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-300"
                               placeholder="方法名" />
                    </div>
                    <div className="flex-1 flex flex-col m-2">
                        <label htmlFor="version" className="mb-2 font-semibold">版本号</label>
                        <input id="version" type="text"
                               className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-300"
                               placeholder="版本号" />
                    </div>
                </div>
                {/*方法名，参数*/}
                {fun && Array.isArray(fun.params) && (
                    <div className="flex flex-col m-2">
                        <div className="mb-2">
                            <label className="font-semibold">方法名</label>
                            <input
                                type="text"
                                value={fun.name}
                                readOnly
                                className="px-4 py-2 border rounded w-full bg-gray-100 cursor-not-allowed focus:outline-none"
                            />
                        </div>
                        {fun && Array.isArray(fun.params) && fun.params.map((param, index) => (
                            <div key={index} className="mb-2">
                                <label className="font-semibold">{`参数${index + 1}`}</label>
                                <input
                                    type="text"
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder={param}
                                    className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-300"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Run Results Area */}
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 h-[300px] overflow-auto">
                <div className="text-gray-800 text-lg font-semibold">运行结果</div>
                <div className="mt-2 text-gray-600">{runResult}</div>
            </div>
        </div>
    )
}
