import React from 'react';
import './transfer.css'; // Import your CSS file
import { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Navbar from '../../components/Navbar/Navbar';
const Transfer = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliderActive, setIsSliderActive] = useState(false);

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTransfer = () => {
    // Handle the transfer logic
    console.log('Transfer initiated');
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
    console.log("Slider change");
  };

  const handleSliderMouseDown = () => {
    setIsSliderActive(true);
    console.log("Slider Mouse Down");
  };

  const handleSliderMouseUp = () => {
    setIsSliderActive(false);
    console.log("Slider Mouse Up");
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
                onChange={handleAccountNumberChange}
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
                onChange={handleAmountChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            
            <div>
            
            </div>
            <br></br>

            {!isSliderActive && (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                onClick={handleTransfer}
              >
                Transfer
              </button>
            )}
          </div>

          </div>
        </div>
      </div>
      </>
    
  );
};

export default Transfer;
