// Dashboard.js

import Sidebar from '../../components/SideBar/Sidebar';
import '../../components/CardLayout/Cardlayout.css';
import Cardlayout from '../../components/CardLayout/Cardlayout';
import TransactionHistoryTable from '../../components/TransactinHistoryTable/TransactionHistoryTable';
import { FaMoneyCheck, FaMoneyBillWave, FaCoins, FaCreditCard } from 'react-icons/fa';


import * as React from 'react';
import { useEffect } from 'react';



import './Dashboard.css'; // Import the CSS file
import Line from './Line';

const Dashboard = () => {
  
  
  return (
    <>
    <div className="dashboard-container">
      <Sidebar />
      {/* <Topbar /> */}
      <div className="dashboard-content">
       {/* <Topbar /> */}
        <div className="cards-row">
        <Cardlayout className='myCard'
           title="Total Balance"
           amount={5000}
           margin-top= "auto"
           icon={<FaMoneyCheck  size={30} color="blue" margin-top="auto" />}
          
        />

          <Cardlayout
            title="Amount of Loan"
            amount={1000} // Replace with actual loan data
           
            icon={<FaCoins  size={30} color="green" />}
          />
          <Cardlayout
            title="Credits"
            amount={300} // Replace with actual credits data
           
            icon={< FaMoneyBillWave  size={30} color="purple" />}
          />
          <Cardlayout
            title="Debits"
            amount={200} // Replace with actual debits data
           
            icon={<FaCreditCard size={30} color="yellow" />}
          />
        </div>
        <div className="dashboard-main-content">
        <div className='Birva'>
         
          <Line />
        </div>
        <div className="transaction-history">
          <h2>Transaction History</h2>
          <TransactionHistoryTable />
        </div>
        </div>
        

      </div>
      {/* 
      */}
  
    </div>
  </>
  );
};

export default Dashboard;
