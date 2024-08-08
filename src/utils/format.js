export function formatArray(arr) {
    const res = arr.map(item => {
        if (typeof item == "string") {
            return `"${item}"`
        } else if (Array.isArray(item)) {
            return `Array [${formatArray(arr[i])}]`
        } else {
            return formatOutput(arr[i])
        }


    })
    return res.join("")
}

export function formatObject(e) {
    var t = e.constructor.name
    if ("String" === t)
        return `String{"${e.valueOf()}"}`
    if (t.match(/^(ArrayBuffer|SharedArrayBuffer|DataView)$/))
        return `${t} {}`
    if (t.match(/^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array)$/))
        return `${t} [${formatArray(e)}]`
    if ("Symbol" === t)
        return e.toString()
    if ("Object" === t) {
        let res = []
        for (let key in e) {
            if (e.hasOwnProperty(key)) {
                res.push(`${key}: ${formatOutput(e[key])}`)
            }
        }
        return `${t} { ${res.join()} }`
    }
    return e
}

export function formatOutput(e) {
    if (e === undefined || e === null || typeof e === "boolean" || typeof e === "number") {
        return String(e)
    } else if (typeof e == "string") {
        return `"${e}"`
    } else if (Array.isArray(e)) {
        return `Array [${formatArray(e)}]`
    } else {
        return formatObject(e)
    }
}
