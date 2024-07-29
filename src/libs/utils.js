import { createEthereumContract } from "@/contexts/Transaction.jsx"
import * as fs from "fs"
import { ethers } from "ethers"

function bufferChunk(buffer, chunkSize) {
    let i = 0
    let result = []
    const len = buffer.length
    const chunkLength = Math.ceil(len / chunkSize)
    while (i < len) {
        result.push(buffer.slice(i, i += chunkLength))
    }

    return result
}

const contract = createEthereumContract()

async function writeFile(fileName, fileRaw) {
    const hexName = "0x" + Buffer.from(`${fileName}.txt`, "utf8").toString("hex")  //

    const contentBuffer = new Buffer([fileRaw])

    const contentBufferToUtf8Str = encodeURIComponent(contentBuffer)  // <string> %0A%20%20%2F...
    const contentUtf8StrToBuffer = Buffer.from(contentBufferToUtf8Str, "utf8")
    let fileSize = contentUtf8StrToBuffer.length


    // Data need to be sliced if file > 475K, for test, set 23k
    let chunks = []
    if (fileSize > 23 * 1024) {  // fileSize > 475 * 1024
        const chunkSize = Math.ceil(fileSize / (23 * 1024))
        chunks = bufferChunk(contentUtf8StrToBuffer, chunkSize)
        fileSize = fileSize / chunkSize
    } else {
        chunks.push(contentUtf8StrToBuffer)
    }
    // Files larger than 24k need stak tokens
    let cost = 0
    if (fileSize > 24 * 1024 - 326) {
        cost = Math.floor((fileSize + 326) / 1024 / 24)
    }

    for (const index in chunks) {
        const chunk = chunks[index]
        const hexData = "0x" + chunk.toString("hex")

        const ifFinal = (index === chunks.length - 1)

        const estimatedGas = await contract.writeChunk.estimateGas(hexName, index, hexData, ifFinal, { value: ethers.parseEther(cost.toString()) })
        // upload file
        const option = {
            gasLimit: (estimatedGas * 6n / 5n).toString(),
            value: ethers.parseEther(cost.toString()),
        }


        // https://0xf5E92c452BC65073dAD94F3432c15ee1BB840FfF.11155111.w3link.io/strToUtf8ByteStr@1.0.1.txt
        // https://0xf5E92c452BC65073dAD94F3432c15ee1BB840FfF.11155111.w3link.io/uint8ArrayToByteStr@1.0.1.txt
        // https://0xf5E92c452BC65073dAD94F3432c15ee1BB840FfF.11155111.w3link.io/uint8ArrayToByteStr@1.0.2.txt
        const tx = await contract.writeChunk(hexName, index, hexData, ifFinal, option)
        await tx.wait(1)
        console.log(`File ${fileName}.txt chunkId: ${index} uploaded!`)
    }
}
