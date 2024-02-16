import axios from "axios";
import React, { useEffect, useState } from 'react';

const TransactionHistoryTable = () => {
  const[transactions,settransactions] = useState([]);
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
          {transactions.slice(0,5).map((transaction, index) => (
            <tr key={index}>
              <td style={transaction.sender === sender_id ?styles.td : styles.td_r}>{transaction.name}</td>
              <td style={transaction.sender === sender_id ?styles.td : styles.td_r}>{transaction.amount}</td>
              <td style={transaction.sender === sender_id ?styles.td : styles.td_r}>{transaction.note}</td>
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

export default TransactionHistoryTable;
