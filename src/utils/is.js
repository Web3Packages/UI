function call(data) {
    return Object.prototype.toString.call(data)
}

export function isArray(data) {
    return Array.isArray(data)
}

export function isObject(data) {
    return call(data) === "[object Object]"
}

export function isArrayBuffer(data) {
    return call(data) === "[object ArrayBuffer]"
}
