import axios from "axios";
import React, { useEffect, useState } from 'react';

const TransactionHistoryTable = () => {
  const[transactions,settransactions] = useState([]);
  const item = JSON.parse(localStorage.getItem('userInfo'));

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
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}className="custom-th">Name</th>
            <th style={styles.th}className="custom-th">Amount</th>
            <th style={styles.th}className="custom-th">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td style={styles.td}>{transaction._id}</td>
              <td style={styles.td}>${transaction.amount}</td>
              <td style={styles.td}>{transaction.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    borderRadius: '12px', 
    boxShadow: '2px 8px 16px rgba(0, 0, 0, 0.6)', 
    overflow: 'hidden', 
    
   
    background: 'rgb(0, 7, 61)',
    
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
    color: 'white'
  },
};

export default TransactionHistoryTable;
