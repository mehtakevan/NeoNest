import React from 'react';
import './transfer.css'; // Import your CSS file
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Navbar from '../../components/Navbar/Navbar';
import toast from 'react-hot-toast';
const Transfer = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  const item = JSON.parse(localStorage.getItem("userInfo"));

  const handleTransfer = async() => {
    const id = item._id;
    console.log(accountNumber);
    console.log(id);
    console.log(amount);

    try{
      console.log("In try block");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data  = await axios.post(
        "http://localhost:5000/api/account/sendmoney",
        { accountNumber,id,amount,note },
        config
      );
      console.log(data);
      if(data.data === "Transaction Completed"){
        toast.success(
          "Transfer Successful",
          {style : {
            background:"green",
            color:"white"
          }}
        );
      navigate('/dashboard')
      }
      console.log('Transfer initiated');
    }
    // Handle the transfer logic
    catch(error){
      toast.error(
        "Error occurred. Please try it after some time.",
        {style : {
          background:"red",
          color:"white"
        }}
      );
      navigate('/dashboard')
      console.log(error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="transfer-container"> {/* Apply transfer-container class */}
  
      <div className="form-container"> {/* Apply form-container class */}
        <div className="flex justify-center items-center">
          <div className="w-1/2 bg-gray-100 p-8">
            <h1 className="text-2xl mb-4">Transfer Money</h1>

            <div className="mb-4">
              <label htmlFor="accountNumber" className="block text-gray-700 font-bold mb-2">
                Account Number
              </label>
              <input
                id="accountNumber"
                type="text"
                placeholder="Enter account number"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="note" className="block text-gray-700 font-bold mb-2">
                Note
              </label>
              <input
                id="note"
                type="text"
                placeholder="Enter a Note"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            
            <div>
            
            </div>
            <br></br>

            
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                onClick={handleTransfer}
              >
                Transfer
              </button>
            
          </div>

          </div>
        </div>
      </div>
      </>
    
  );
};

export default Transfer;
