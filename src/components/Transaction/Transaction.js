import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Transaction() {
  const { id } = useParams()

  const [data, setData] = useState(null)
  const [arrayTransactions, setArrayTransactions] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData(){
    try {
      const url = process.env.NODE_ENV === "production"
      ? `https://budegt-app-backend.onrender.com/transactions/${id}`
      : `http://localhost:3001/transactions/${id}`

      let result = await axios.get(url)
      setData(result.data.data)

    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigateBack(){
    navigate("/")
  }


  async function handleDeleteById(){
    try {
      let result = await axios.delete(`http://localhost:3001/transactions/${id}`)

      let filteredArray = arrayTransactions.filter((item) => item.id !== id);

      setArrayTransactions(filteredArray);
    
    } catch (error) {
      console.log(error); 
    }

    navigate("/")
  }

  function handleUpdate(id){
    navigate(`/${id}/edit`)
  }

  return (
    <div>
      <div>
        <div>
        <h2> Transaction Details</h2>
        </div>
      
      <p>{data?.item_name}</p>
      <p>{data?.amount}</p>
      <p>{data?.catergory}</p>
      <p>{data?.from}</p>
      <p>{data?.date}</p>
      </div>
      <div className="log-container-navigation">
          <ul>
            <li>
              <button onClick={handleNavigateBack}>Back</button>
            </li>
            <li>
              <button onClick={()=> handleUpdate(id)}>Edit</button>
            </li>
            <li>
              <button onClick={()=> handleDeleteById()}>Delete</button>
            </li>
          </ul>
        </div>
    </div>
  )
}
 
export default Transaction