import { createContext } from "react"
import { ethers, AbiCoder } from "ethers"
import { contractABI, contractAddress } from "@/constants/contract.json"

export const TransactionContext = createContext()

const { ethereum } = window

async function createEthereumContract() {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    return new ethers.Contract(contractAddress, contractABI, signer)
}

export function TransactionsProvider({ children }) {
    const [currentAccount, setCurrentAccount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))
    const [transactions, setTransactions] = useState([])

    async function getTransactions() {
        const abi = new AbiCoder()
        try {
            const contract = await createEthereumContract()
            const transactions = await contract.getAllCheckinPoints() // solidity methods
            const list = []
            for (const transaction of transactions) {
                //                                          solidity params type
                const transactor = abi.decode(["uint32", "uint64", "uint64", "uint32", "uint32", "uint32", "address", "string", "string", "bool"], transaction)
                // example: return params. add list to show
                list.push({
                    sn: transactor[0].toString(),
                    longitude: parseFloat(transactor[3].toString()) / 1000000,
                    latitude: parseFloat(transactor[4].toString()) / 1000000,
                    deviation: parseFloat(transactor[5].toString()) / 1000000,
                    owner: transactor[6],
                    description: transactor[7],
                    city: transactor[8],
                    checked: transactor[9],
                })
            }
            setTransactions(list)
        } catch (error) {
            console.log(error)
        }
    }

    async function checkIfWalletIsConnect() {
        try {
            if (!ethereum) return alert("Please install MetaMask.")

            const accounts = await ethereum.request({ method: "eth_accounts" })

            if (accounts.length) {
                setCurrentAccount(accounts[0]) // get user account
                await getTransactions()
            } else {
                console.log("No accounts found")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function connectWallet() {
        try {
            if (!ethereum) return alert("Please install MetaMask.")

            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            console.log(accounts)

            setCurrentAccount(accounts[0])
            location.reload()
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnect()
    }, [transactionCount])

    return (
        <TransactionContext.Provider
            value={{
                transactionCount,
                connectWallet,
                transactions,
                isLoading,
                currentAccount,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}
