import { TransactionsProvider } from "@/contexts/Transaction.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "@/components/Welcome.jsx";
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
