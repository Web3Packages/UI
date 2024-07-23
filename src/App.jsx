import { TransactionsProvider } from "@/contexts/Transaction.jsx";
import Welcome from "@/components/Welcome.jsx";

function App() {

    return (
        <TransactionsProvider>
            <Welcome />
        </TransactionsProvider>
    )
}

export default App
