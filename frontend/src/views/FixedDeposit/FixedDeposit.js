import React, { useState } from 'react';
import './FixedDeposit.css'; 
import Navbar from '../../components/Navbar/Navbar';
import axios from "axios";
import { useHistory, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import {withStyles} from '@material-ui/core/styles'
import  Slider  from "@material-ui/core/Slider";
import toast from 'react-hot-toast';

const Prettoslider = withStyles ({
  
  root: {color: 'MediumVioleted', height: 10},
  thumb: {height: 25, width: 25, backgroundcolor: 'white', border: '3px solid black', margintop: -9, marginLeft: -9}, 
  track: {height: 10, borderRadius: 4}, 
  rail: {height: 10, borderRadius: 4},
}) (Slider);

const FixedDeposit = () => {
  const [amount, setAmount] = useState('');

  const [maturityAmount, setMaturityAmount] = useState();
  const [period, setPeriod] = useState(0);
  const maxValue = 10000;
  const maxPeriod = 20;
  const item = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const calculateMaturityAmount = () => {
    const interestRate = 0.1; 
    const interest = amount * interestRate * period;
    const maturity = parseFloat(amount) + interest;
    setMaturityAmount(maturity.toFixed(2));
  };

  const marksTenure = [
    {value: 0, label: '0yrs'}, 
    {value: 5, label: '5yrs'},
    {value: 10, label: '10yrs'}, 
    {value: 15, label:'15yrs'},
    {value: 20, label:'20yrs'}
  ]

  const marksAmount = [
    {value: 0, label: "0"},
    {value: 1000, label: "₹1000"},
    {value: 3000, label: "₹3000"},
    {value: 5000, label: "₹5000"},
    {value: 8000, label: "₹8000"},
    {value: 10000, label: "₹10000"}
  ]
   
  const submitHandler = async() =>{
    const id = item._id;
    console.log(id);
    console.log(amount);

    try {
      console.log("In try block");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = await axios.post(
        "http://localhost:5000/api/account/getfixeddeposit",
        {  id, amount },
        config
      );
      console.log(data);
      if (data.data === "Fixed Deposit Created") {
        toast.success(
          "Fixed Deposit Created",
          {style : {
            background:"green",
            color:"white"
          }}
        );
        navigate("/dashboard");
      }
      console.log("Transfer initiated");
    } catch (error) {
      // Handle the transfer logic
      toast.error(
        "Error Occurred. Please Try it after some time",
        {style : {
          background:"red",
          color:"white"
        }}
      );
      navigate("/dashboard");
      console.log(error);
    }

    // Handle the transfer logic
    console.log("Fixed Dedposit");
  }

  return (
 <>
       <Navbar />
      <div className="loan-container">
        {" "}
        {/* Apply transfer-container class */}
        <div className="form-container">
          {" "}
          {/* Apply form-container class */}
          <div className="flex justify-center items-center">
            <div className="w-1/2 bg-gray-100 p-8">
              <h1 className="text-2xl mb-4">Add Fixed FixedDeposit</h1>
              <div className="grid grid-rows-2 gap-0">
                <div className="grid grid-cols-2">
                
                <div className="text-bold">
                <label
                  htmlFor="period"
                  className="block text-gray-700 font-bold text-lg mt-3"
                >
                  Period(in years)
                </label>
                </div>
                <div className=" w-3/4">
                <input
                  id="period"
                  type="number"
                  placeholder="Enter period"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
                </div>
                </div>
                <Prettoslider className = "mt-0" marks={marksTenure} value={period} onChange={(event, period) => {setPeriod(period)}} defaultValue = {period} max={maxPeriod}/>
          
          </div>
          <br/>
          
          <div className="grid grid-rows-2 gap-0">
            <div className="grid grid-cols-2">
            
            <div className="text-bold">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-bold text-lg mt-3"
            >
              Amount(in ₹)
              </label>
                </div>
                <div className=" w-3/4">
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                </div>
                </div>
                <Prettoslider className = "mt-0" marks={marksAmount} value={amount} onChange={(event, amount) => {setAmount(amount)}} defaultValue = {amount} max={maxValue}/>
              </div>
              <br/>
              {(maturityAmount) && <div><p>Your maturity amount:  <span className="text-green-800 font-bold">₹{maturityAmount}</span></p></div>}
              <div className="grid grid-cols-2">
                <div className="w-1/2">
              <button
                  className="ml-20 w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                  onClick={calculateMaturityAmount}
                >
                 Calculate
                 </button>
                </div>
                <div className="w-1/2">
              <button
                  className="ml-10 w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                  onClick={submitHandler}
                
                >
                    Create Fixed Deposit
                </button>
                </div>
              </div>
              </div>
          </div>
          </div>
      </div>

 </> 
  );
}

export default FixedDeposit;
