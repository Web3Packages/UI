import { createContext } from "react"
import { ethers, AbiCoder } from "ethers"
import { contractABI, contractAddress } from "@/constants/contract.json"
import { useContractionStore } from "@/stores"

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
    const { setContract } = useContractionStore()

    async function getTransactions() {
        const abi = new AbiCoder()
        try {
            const contract = await createEthereumContract()
            setContract(contract)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    async function checkIfWalletIsConnect() {
        try {
            // if (!ethereum) return alert("Please install MetaMask.")
            if (!ethereum) return

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
        setIsLoading(false)
    }

    async function connectWallet() {
        try {
            // if (!ethereum) return alert("Please install MetaMask.")
            if (!ethereum) return

            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            console.log(accounts)

            setCurrentAccount(accounts[0])
            // location.reload()
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
