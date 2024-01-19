// Dashboard.js
import React from 'react';
import Sidebar from '../../components/SideBar/Sidebar';
import '../../components/CardLayout/Cardlayout.css';
import Cardlayout from '../../components/CardLayout/Cardlayout';
import TransactionHistoryTable from '../../components/TransactinHistoryTable/TransactionHistoryTable';
import { FaMoneyCheck, FaMoneyBillWave, FaCoins, FaCreditCard } from 'react-icons/fa';

import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="cards-row">
        <Cardlayout className='myCard'
           title="Total Balance"
           amount={5000}
           description="Your overall account balance."
           icon={<FaMoneyCheck  size={30} color="blue" />}
          
/>

          <Cardlayout
            title="Amount of Loan"
            amount={1000} // Replace with actual loan data
            description="The amount of loan you have taken."
            icon={<FaCoins  size={30} color="green" />}
          />
          <Cardlayout
            title="Credits"
            amount={300} // Replace with actual credits data
            description="Your total credits."
            icon={< FaMoneyBillWave  size={30} color="purple" />}
          />
          <Cardlayout
            title="Debits"
            amount={200} // Replace with actual debits data
            description="Your total debits."
            icon={<FaCreditCard size={30} color="yellow" />}
          />
        </div>
        <div className="transaction-history">
          <h2>Transaction History</h2>
          <TransactionHistoryTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
