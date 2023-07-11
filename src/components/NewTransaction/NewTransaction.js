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
      let result = await axios.post(`http://localhost:3001/transactions/new-transaction`, {
        ...data,
      });

    //   console.log(result.data.data.id);

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
            />
            </div>
            <div >
              <label>Amount: </label>
              <input type="text"
              value={data.amount}
              onChange={(e) => {
                setData({ ...data, amount: e.target.value });
              }}
            />
            </div>
  
            <div >
              <label>From: </label>
              <input type="text"
              value={data.from}
              onChange={(e) => {
                setData({ ...data, from: e.target.value });
              }}
            />
            </div>
  
            <div >
              <label>Date: </label>
              <input type="text"
              value={data.date}
              onChange={(e) => {
                setData({ ...data, date: e.target.value });
              }}
            />
            </div>
  
            <div >
              <label>Catergory: </label>
              <input type="text"
              value={data.category}
              onChange={(e) => {
                setData({ ...data, category: e.target.value });
              }}
            />
            </div>  
            <button>Submit</button>
          </form>
        </div>
      </div>
  )
}

export default NewTransaction