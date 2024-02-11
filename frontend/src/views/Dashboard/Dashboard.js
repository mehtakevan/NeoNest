// Dashboard.js
import Sidebar from '../../components/SideBar/Sidebar';
import '../../components/CardLayout/Cardlayout.css';
import Cardlayout from '../../components/CardLayout/Cardlayout';
import TransactionHistoryTable from '../../components/TransactinHistoryTable/TransactionHistoryTable';
import { FaMoneyCheck, FaMoneyBillWave, FaCoins, FaCreditCard } from 'react-icons/fa';
import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";
import './Dashboard.css'; // Import the CSS file
import Line from './Line';



const Dashboard = () => {
  const[TotalBalance,setTotalBalance] = useState(0);
  const[TotalLoan,setTotalLoan] = useState(0);
  const[TotalStock,setTotalStock] = useState(0);
  const[TotalFD,setTotalFD] = useState(0);
  const[username,setusername] = useState('User');

  const item = JSON.parse(localStorage.getItem('userInfo'));
  console.log(item);
  console.log(item.email);

  const getData = async(email)=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data  = await axios.post(
        "http://localhost:5000/api/account/getData",
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
    console.log("Hey from dashboard");
   
    console.log(email);
    const data = await getData(email);

    console.log("-------------------------------")
    console.log(data);

    setTotalBalance(data.data.totalamount);
    setTotalLoan(data.data.totalloan);
    setTotalFD(data.data.totalfd);
    setTotalStock(data.data.totalstocks);
    setusername(data.data.name);
    }
    fetchData();
  },[]);

  useEffect(()=>{
    console.log("hello");
  },[]);
  
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
           amount={TotalBalance}
           margin-top= "auto"
           icon={<FaMoneyCheck  size={30} color="blue" margin-top="auto" />}
          
        />

          <Cardlayout
            title="Amount of Loan"
            amount={TotalLoan} // Replace with actual loan data
           
            icon={<FaCoins  size={30} color="green" />}
          />
          <Cardlayout
            title="FixedDeposits"
            amount={TotalFD} // Replace with actual credits data
           
            icon={< FaMoneyBillWave  size={30} color="purple" />}
          />
          <Cardlayout
            title="Stocks"
            amount={TotalStock} // Replace with actual debits data
           
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
