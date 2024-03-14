import axios from "axios";
import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar/Navbar";
// import {bgimage} from "../assets/bgimage.jpg";
// import {Button} from '';


const FullTransactionTable = () => {
  const[transactions,settransactions] = useState([]);
  const [page, setPage] = useState(1);
  const transactionsPerPage = 5;

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const startIndex = (page - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;

  const results = transactions.filter(t => t.note !== "Loan Approved" && t.note !== "Fixed Deposit");
  // Slice the transactions to display only the ones for the current page
  const displayedTransactions = results.slice(startIndex, endIndex);
  
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const item = JSON.parse(localStorage.getItem('userInfo'));
  const sender_id = item._id;
  console.log(sender_id);

  const getData = async(email)=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data  = await axios.post(
        "http://localhost:5000/api/transaction/gettrandata",
        { email },
        config
      );
      console.log(data);
      return data;
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    // const name = item.name;
    const fetchData = async() =>{
      const email = item.email;
      console.log("Hey from Trans");
    
      console.log(email);
      const data = await getData(email);

      console.log("-------------------------------")
      console.log(data);
      settransactions(data.data.sender);
    }
    fetchData();
  },[]);

  useEffect(()=>{
    console.log(transactions);
  },[transactions]);

  return (
    <>
    {/* <div className="grid grid-cols-12"> */}
      {/* <div className="w-1/2"> */}
        {/* <Sidebar/> */}
      {/* </div> */}
      
      <div className="m-5 mt-30 p-2">
      <Navbar/>
      </div>
      {/* <div className="col-span-11"> */}
        <div className="text-4xl text-gray-700 text-bold p-10">Your Transaction History</div>
        {/* <div className="w-1/2 p-6 ms-72"> */}
          
          {/* <SearchBar value={this.state.value}
    onChange={(newValue) => this.setState({ value: newValue })}
    onRequestSearch={() => onSearch(this.state.value)}/> */}
        {/* </div> */}
        <div className="w-3/4 ms-52">
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}className="custom-th">Name</th>
            <th style={styles.th}className="custom-th">Amount</th>
            <th style={styles.th}className="custom-th">Note</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-600">
              <td style={transaction.sender === sender_id ?styles.td : styles.td_r}>{transaction.name}</td>
              <td style={transaction.sender === sender_id ?styles.td : styles.td_r}> ₹{transaction.amount}.00</td>
              <td style={transaction.sender === sender_id ?styles.td : styles.td_r}>{transaction.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
        <div className="ml-8">
        <button disabled={page === 1} onClick={prevPage} className="w-1/10  border bg-gray-300 border-gray-300 text-sm md:text-md p-2 m-10 rounded-lg mb-4 md:mb-6 hover:bg-black hover:text-white">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={nextPage} className="w-1/10 border bg-gray-300 border-gray-300 text-sm md:text-md p-2 m-10 rounded-lg mb-4 md:mb-6 hover:bg-black hover:text-white">Next</button>
      </div>
      {/* </div> */}
    
    </>
  );
};

const styles = {
  container: {
    borderRadius: '12px', 
    boxShadow: '2px 8px 16px rgba(0, 0, 0, 0.6)', 
    overflow: 'hidden', 
    
   
    background: ' rgb(0, 55, 61)',
    
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    
    padding: '12px', 
    // textAlign: 'left',
    borderBottom: '1px solid #ddd',
    fontSize: '20px', 
    fontWeight: 'bold', 
    color: 'white', 
  },
  td: {
    padding: '12px', 
    borderBottom: '1px solid #ddd',
    fontSize: '14px', 
    fontWeight: 'bold', 
    color: 'white',
    // background : 'red'
  },
  td_r: {
    padding: '12px', 
    borderBottom: '1px solid #ddd',
    fontSize: '14px', 
    fontWeight: 'bold', 
    color: 'green',
    // background : 'green'
  },
};

export default FullTransactionTable;
