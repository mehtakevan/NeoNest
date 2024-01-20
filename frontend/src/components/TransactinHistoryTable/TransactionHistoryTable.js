
import React from 'react';

const TransactionHistoryTable = () => {
  
  const transactions = [
    { name: 'Birva', amount: 100, date: '2022-01-01' },
    { name: 'Kevan', amount: 150, date: '2022-01-02' },
    { name: 'Mansi', amount: 200, date: '2022-01-03' },
    
  ];

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
              <td style={styles.td}>{transaction.name}</td>
              <td style={styles.td}>${transaction.amount}</td>
              <td style={styles.td}>{transaction.date}</td>
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
