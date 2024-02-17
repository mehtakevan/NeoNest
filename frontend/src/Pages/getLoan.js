// import { useToast }  from "@chakra-ui/toast";
import { useState } from "react";
import axios from "axios";
import { useHistory, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./getLoan.css";
import {withStyles} from '@material-ui/core/styles'
import  Slider  from "@material-ui/core/Slider";
import toast from 'react-hot-toast';

const Prettoslider = withStyles ({
  
  root: {color: 'MediumVioleted', height: 10},
  thumb: {height: 25, width: 25, backgroundcolor: 'white', border: '3px solid black', margintop: -9, marginLeft: -9}, 
  track: {height: 10, borderRadius: 4}, 
  rail: {height: 10, borderRadius: 4},
}) (Slider);

const Loan = () => {
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [emi, setEmi] = useState();
  const [totalamt, setTotalamt] = useState();
  const [totalint, setTotalint] = useState();
  const maxValue = 10000;
  const maxPeriod = 20;
  //const toast = useToast();
  const navigate = useNavigate();
  const item = JSON.parse(localStorage.getItem("userInfo"));

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

  const handleLoan = async () => {
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
        "http://localhost:5000/api/account/getloan",
        {  id, amount },
        config
      );
      console.log(data);
      if (data.data === "Loan Approved") {
        toast.success(
          "Transaction Successful",
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
    console.log("Loan Avail");
  };

  const calculateEmi = async () => {
    let amt = amount;
    let prd = period;
    let rate = 0;
    switch (period){
      case 0.5 : 
        rate = 12
        break
      case 1:
        rate = 10
        break;
      case 2:
        rate = 8
        break
      default:
        rate = 10
    }
    rate  = rate / 1200
    prd *= 12
    var emi = [amt * rate]/[1 - (Math.pow(1/(1+rate),prd))]
    var total = emi * prd
    var TotalAmountofCredit = (emi / rate) * (1 - Math. pow((1 + rate), (-prd)));
    const TotalAmountofInterest = total - TotalAmountofCredit;
    setEmi(Math.round(emi))
    setTotalamt(Math.round(total))
    setTotalint(Math.round(TotalAmountofInterest))

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
              <h1 className="text-2xl mb-4">Avail Loan</h1>
              
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
              {(emi) && <div><p>Your monthly emi will be <span className="text-green-800 font-bold">₹{emi}</span></p></div>}
              {(totalamt) && <div><p>Your total payable amount will be <span className="text-green-800 font-bold">₹{totalamt}</span></p></div>}
              {(totalint) && <div><p>Your total interest payable will be <span className="text-green-800 font-bold">₹{totalint}</span></p></div>}

              <div className="grid grid-cols-2">
                <div className="w-1/2">
              <button
                  className="ml-20 w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                  onClick={calculateEmi}
                >
                  Calculate
                </button>
                </div>
                <div className="w-1/2">
              <button
                  className="ml-10 w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                  onClick={handleLoan}
                >
                  Avail
                </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Loan;