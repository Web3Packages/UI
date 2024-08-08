import { ethers } from "ethers"

export * from "./console"

export function bytesToStr(bytes) {

    const str = ethers.toUtf8String(bytes)
    return decodeURIComponent(str)
}

export function getFunctionFileName(functionName) {
    return ethers.toUtf8Bytes(`/${functionName}.txt`)
}
