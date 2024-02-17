import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import Slider from '../components/Slider/slider';
import Sidebar from '../components/SideBar/Sidebar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from "react";

const Transfer = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();
  const item = JSON.parse(localStorage.getItem("userInfo"));

  const handleTransfer = async() => {
    const accountNumber = accountNumber;
    const id = item._id;
    const amt = amount;
    console.log(accountNumber);
    console.log(id);
    console.log(amt);

    try{
      console.log("In try block");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data  = await axios.post(
        "http://localhost:5000/api/account/sendmoney",
        { accountNumber,id,amount },
        config
      );
      console.log(data);
      console.log('Transfer initiated');
    }
    // Handle the transfer logic
    catch(error){
      console.log(error);
    }
  };
  

  
  return (
    <div style={{ display: 'flex'}}>
      <Sidebar />
    <div className="flex-1 justify-center items-center h-screen">
      <div className="w-1/2 flex justify-center items-center space-x-8">
        
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
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-6 w-${sliderValue} bg-blue-500 transition-all duration-300 ease-in-out`}
              style={{ width: `${sliderValue}%` }}
            ></div>
          </div>
            <div>
                
          <Slider />
            </div>
            <br></br>
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
              onClick={handleTransfer}
            >
              Transfer
            </button>
          
        </div>

        <div className="w-1/2 bg-gray-200 h-64 flex justify-center items-center">
              <Swiper
               modules={[Navigation, Pagination, Scrollbar, A11y]}
               spaceBetween={50}
               slidesPerView={3}
               navigation
               pagination={{ clickable: true }}
               scrollbar={{ draggable: true }}
               onSwiper={(swiper) => console.log(swiper)}
               onSlideChange={() => console.log('slide change')}
              >
                <SwiperSlide>
                <img src="/2.jpg" alt="Image 1" />
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
              </Swiper>
        </div>
      </div>
    </div>
    </div>
    );
  };

  export default Transfer