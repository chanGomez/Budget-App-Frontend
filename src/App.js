import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./components/Transactions/Transactions"
import NewTransaction from "./components/NewTransaction/NewTransaction"
import UpdateTransaction from "./components/Update/Update"
import Navbar from "./components/Navbar/Navbar"
import Transaction from "./components/Transaction/Transaction";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element= {<Transactions/>} />
        <Route path="/new-transaction" element= {<NewTransaction/>} />
        <Route path="/:id" element= {<Transaction/>} />
        <Route path="/:id/edit" element= {<UpdateTransaction/>} />
      </Routes>
    </Router>
  );
}

export default App;