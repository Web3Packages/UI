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

            <ul>
                {transactions.map((item, idx) => {
                    return (
                        <li key={idx}>
                            <div>{item.sn} </div>
                            <div>{item.longitude} </div>
                            <div>{item.latitude} </div>
                            <div>{item.deviation} </div>
                            <div>{item.owner} </div>
                            <div>{item.description} </div>
                            <div>{item.city} </div>
                            <div>{item.checked} </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Welcome
