import { TransactionContext } from "@/contexts/Transaction.jsx"

function Welcome() {

    const { isLoading, connectWallet, transactions } = useContext(TransactionContext)

    return (
        <div className="h-full flex justify-center items-center flex-col">
            <hgroup>
                <h1>Welcome to Web3-Packages Demo</h1>
            </hgroup>
            {
                isLoading
                    ? <div>loading...</div>
                    : (
                        <button
                            className="text-white px-4 py-2 rounded-xl flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 cursor-pointer hover:bg-[#2546bd] gap-1"
                            onClick={connectWallet}>
                            <img src="/assets/icons/Action.svg" alt="actions" /> <span> Connect Wallet </span>
                        </button>
                    )
            }

            transaction is {transactions.toString()}
        </div>
    )
}

export default Welcome
