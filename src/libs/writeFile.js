import { ethers } from "ethers"

function bufferChunk(buffer, chunkSize) {
    const result = []
    for (let i = 0; i < buffer.length; i += chunkSize) {
        result.push(buffer.slice(i, i + chunkSize))
    }
    return result
}

const encoder = new TextEncoder()
export async function writeFile(fileName, fileRaw, contract) {
    const fileNameUint8Array = encoder.encode(`${fileName}.txt`)
    const hexName = "0x" + Array.from(fileNameUint8Array).map(byte => byte.toString(16).padStart(2, "0")).join("")

    const contentBuffer = new Uint8Array([fileRaw])

    const contentBufferToUtf8Str = encodeURIComponent(new TextDecoder().decode(contentBuffer))
    const contentUtf8StrToBuffer = encoder.encode(contentBufferToUtf8Str)
    let fileSize = contentUtf8StrToBuffer.length

    let chunks = []
    if (fileSize > 23 * 1024) {
        const chunkSize = Math.ceil(fileSize / (23 * 1024))
        chunks = bufferChunk(contentUtf8StrToBuffer, chunkSize)
        fileSize = fileSize / chunkSize
    } else {
        chunks.push(contentUtf8StrToBuffer)
    }

    let cost = 0
    if (fileSize > 24 * 1024 - 326) {
        cost = Math.floor((fileSize + 326) / 1024 / 24)
    }
    debugger
    for (const index in chunks) {
        const chunk = chunks[index]
        const hexData = "0x" + Array.from(chunk).map(byte => byte.toString(16).padStart(2, "0")).join("")

        const ifFinal = (index === chunks.length - 1)

        const estimatedGas = await contract.writeChunk.estimateGas(hexName, index, hexData, ifFinal, { value: ethers.parseEther(cost.toString()) })

        const option = {
            gasLimit: (estimatedGas * 6n / 5n).toString(),
            value: ethers.parseEther(cost.toString()),
        }

        const tx = await contract.writeChunk(hexName, index, hexData, ifFinal, option)
        await tx.wait(1)
        console.log(`File ${fileName}.txt chunkId: ${index} uploaded!`)
    }
}
