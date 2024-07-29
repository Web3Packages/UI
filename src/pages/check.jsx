import React, { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const Check = () => {
    const [code, setCode] = useState('const a = 5;\nconst b = 10;\na + b');
    const [runCode, setRunCode] = useState('console.log(`111`)');
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        // Implement remote search logic here
        console.log('Searching for:', inputValue);
    };

    return (
        <div className="h-screen bg-gradient-to-r from-purple-100 to-blue-100">
            {/* Title Section */}
            <div className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold py-4 flex items-center justify-between px-4">
                <span>Welcome to Web3-Packages Demo</span>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-1 w-full">
                {/* Code Area */}
                <div className="flex-1 p-4">
                    <div className="flex mb-4 space-x-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Input some text here..."
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150 ease-in-out"
                        >
                            Search
                        </button>
                    </div>
                    <div className="text-gray-700">
                        <CodeMirror
                            value={code}
                            height="740px"
                            extensions={[javascript({ jsx: true })]}
                            onChange={(value) => setCode(value)}
                        />
                    </div>
                </div>

                {/* Right Side Area */}
                <div className="flex flex-col w-1/3 p-4 space-y-4">
                    {/* Test Code Area */}
                    <div className="relative flex-1">
                        <button
                            className="absolute top-2 right-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150 ease-in-out z-10">
                            Run
                        </button>
                        <div className="text-gray-700">
                            <CodeMirror
                                value={runCode}
                                height="470px"
                                extensions={[javascript({ jsx: true })]}
                                onChange={(value) => setRunCode(value)}
                            />
                        </div>
                    </div>

                    {/* Run Results Area */}
                    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 h-[300px]">
                        <div className="text-gray-800 text-lg font-semibold">运行结果</div>
                        <div className="mt-2 text-gray-600">
                            {/* Placeholder for results */}
                            The results will be displayed here.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Check;
