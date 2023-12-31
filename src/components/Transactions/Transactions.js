import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Transaction.css"

function Transactions() {

    const [transactionsArray, setTransactionsArray] = useState([]);
    const [balance, setBalance] = useState(0)
    const [changingColor, setChangingColor] = useState("")

    useEffect(() => {
        fetchData();
      }, []);

      async function fetchData() {
        try {
          const url = process.env.NODE_ENV === "production"
          ? `https://budegt-app-backend.onrender.com/transactions`
          : `http://localhost:3001/transactions`

          let result = await axios.get(url);

          setTransactionsArray(result.data);


        const sum = result.data.reduce((accumulator, object) => {
          return Number(accumulator) + Number(object.amount)
        }, 0);
        
        setBalance(sum)

        if(sum > 100 ){
          setChangingColor("green")
        }else if( sum < 100 && sum > 0){
          setChangingColor("yellow")
        } else if( sum === 0){
          setChangingColor("black")
        }else(
          setChangingColor("red")
        )
          

        } catch (e) {
          console.log(e);
        }
      }
  
  return (
    <div>
        <div>
          <h3>Bank Account Total: <span style={ { color: changingColor } }>{balance}</span></h3>
        </div>
        {transactionsArray.map(({id, item_name, amount, date,  }) =>{
            return (
            <div key={id}>
                <ul>
                    <li>{date}</li>
                    <li>
                        <Link to={`/${id}`} style={ { color: "black" } }>{item_name}</Link>
                    </li>
                    <li>{amount}</li>
                </ul>               
          </div>
            )
        })}
    </div>
  )
}

export default Transactions