import { Fragment } from "react"

export default function Result({ results }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-h-80 flex-4 w-full">
            <div className="text-gray-800 text-lg mb-2 font-semibold">Results</div>
            {results.map?.((r, index) => (
                <Fragment key={r + index}>
                    {r.includes("Error")
                        ? <div className="border-2 border-red-50 border-solid text-red-500">{r} </div>
                        : <div className="mt-2 text-gray-600">{r} </div>
                    }
                    {index !== results.length - 1 && <hr />}
                </Fragment>
            ))}
        </div>
    )
}
