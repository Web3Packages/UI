import { ethers } from "ethers";

export function bytesToStr(bytes) {

    const str = ethers.toUtf8String(bytes)
    return decodeURIComponent(str)
}

export function getFunctionFileName(functionName) {
    return ethers.toUtf8Bytes(`/${functionName}.txt`)
}
export * from './console'