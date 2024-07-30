import { TransactionsProvider } from "@/contexts/Transaction.jsx"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Home from "@/pages/home.jsx"
import Edit from "@/pages/edit.jsx"
import Check from "@/pages/check.jsx"

function App() {
    return (
        <TransactionsProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/check" element={<Check />} />
                </Routes>
            </Router>
        </TransactionsProvider>
    )
}

export default App
