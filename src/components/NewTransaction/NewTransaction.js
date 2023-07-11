import React, { useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function NewTransaction() {
    const navigate = useNavigate()

    const [data, setData] = useState({
    item_name: "",
    amount: 0,
    from: "",
    date: "",
    category: "",
    })

async function handleOnSubmit(event) {
    event.preventDefault();

    try {
      const url = process.env.NODE_ENV === "production"
      ? "https://budegt-app-backend.onrender.com/transactions/new-transaction"
      : `http://localhost:3001/transactions/new-transaction`

      let result = await axios.post(url, {
        ...data,
      });

    let id = result.data.data.id

      alert("Success");
      navigate(`/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
        <div>
          <h2>New Transaction</h2>
        </div>
  
        <div >
          <form onSubmit={handleOnSubmit}>
            <div >
              <label>Item Name: </label>
              <input type="text"
              value={data.item_name}
              onChange={(e) => {
                setData({ ...data, item_name: e.target.value });
              }}
              required/>
            </div>
            
            <div >
              <label>Amount: </label>
              <input type="number"
              value={data.amount}
              onChange={(e) => {
                setData({ ...data, amount: e.target.value });
              }}
              required/>
            </div>
  
            <div >
              <label>From: </label>
              <input type="text"
              value={data.from}
              onChange={(e) => {
                setData({ ...data, from: e.target.value });
              }}
              required/>
            </div>
  
            <div >
              <label>Date: </label>
              <input type="text"
              value={data.date}
              onChange={(e) => {
                setData({ ...data, date: e.target.value });
              }}
              required/>
            </div>
  
            <div >
              <label>Catergory: </label>
              <input type="text"
              value={data.category}
              onChange={(e) => {
                setData({ ...data, category: e.target.value });
              }}
              required/>
            </div>  
            <button>Submit</button>
          </form>
        </div>
      </div>
  )
}

export default NewTransaction