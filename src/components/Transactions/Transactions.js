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
        doMath();
      }, []);
    
      async function fetchData() {
        try {
          let result = await axios.get("http://localhost:3001/transactions");
          // console.log(result);
          console.log(result.data);
          setTransactionsArray(result.data);

        } catch (e) {
          console.log(e);
        }
      }

      function doMath(){

        const sum = transactionsArray.reduce((accumulator, object) => {
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
      }
  
  return (
    <div>
        <div>
          <h3>Bank Account Total: 
          <p style={ { color: changingColor } }>{balance}</p></h3>
        </div>
        {transactionsArray.map(({id, item_name, amount, date,  }) =>{
            return (
            <div key={id}>
                <ul>
                    <li>{date}</li>
                    <li>
                        <Link to={`/${id}`}>{item_name}</Link>
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