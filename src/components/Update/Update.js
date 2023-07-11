import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function Update() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [itemNameState, setItemNameState] = useState("");
    const [amountState, setAmountState] = useState(0);
    const [fromState, setFromState] = useState("");
    const [dateState, setDateState] = useState("");
    const [catergoryState, setCategoryState] = useState("");


    useEffect(() => {
        handleFetchData();
      }, []);
    
      async function handleFetchData() {
        try {
            let result = await axios.get(`http://localhost:3001/transactions/${id}`)
            
          const {
            amount,
            category,
            date,
            from,
            item_name
        } = result.data.data

        setItemNameState(item_name)
        setAmountState(amount)
        setFromState(from)
        setDateState(date)
        setCategoryState(category)

        } catch (e) {
          console.log(e);
        }
      }

      async function handleOnSubmit(e) {
        e.preventDefault();

        try {
          let result = await axios.put(`http://localhost:3001/transactions/${id}/edit`, 
          {
            item_name: itemNameState,
            amount: amountState,
            from: fromState,
            date: dateState,
            category: catergoryState,
          });
    
          alert("Updated successfully");

          const {
             item_name: newName,
             amount: newAmount,
             from: newFrom,
             date: newDate,
             category: newCatergory,
            } = result.data.data;

            setItemNameState(newName)
            setAmountState(newAmount)
            setFromState(newFrom)
            setDateState(newDate)
            setCategoryState(newCatergory)

            navigate(`/${id}`)
        } catch (e) {
          console.log(e);
        }
        
      }

    
    return (
      <div>
        <div>
          <h2>Edit Transaction</h2>
        </div>
        <div >
          <form onSubmit={handleOnSubmit}>
            <div >
              <label>Item Name: </label>
              <input type="text" value={itemNameState} 
              onChange={(e) => setItemNameState(e.target.value)}
              required/>
            </div>
            <div >
              <label>Amount: </label>
              <input type="number"value={amountState}
              onChange={(e) => setAmountState(e.target.value)} 
              required/>
            </div>
  
            <div >
              <label>From: </label>
              <input type="text" value={fromState}
              onChange={(e) => setFromState(e.target.value)}
              required/>
            </div>
  
            <div >
              <label>Date: </label>
              <input type="text" value={dateState}
              onChange={(e) => setDateState(e.target.value)}
              required/>
            </div>
  
            <div >
              <label>Catergory: </label>
              <input type="text" value={catergoryState}
              onChange={(e) => setCategoryState(e.target.value)}
              required/>
            </div>  
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }

export default Update