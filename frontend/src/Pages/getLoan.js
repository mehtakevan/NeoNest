import Slider from '../components/Slider/slider';
import Sidebar from '../components/SideBar/Sidebar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from "react";

const Loan = () => {

    const [amount, setAmount] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSliderActive, setIsSliderActive] = useState(false);
  
    const handleAmountChange = (e) => {
      setAmount(e.target.value);
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
        <div style={{ display: 'flex'}}>
        <Sidebar />
        <div className="flex-1 justify-center items-center h-screen">
        <div className="w-1/2 flex justify-center items-center space-x-8">
            
            <div className="w-1/2 bg-gray-100 p-8">
            <h1 className="text-2xl mb-4">Avail Loan</h1>

            {/* <div className="mb-4">
                <label htmlFor="accountNumber" className="block text-gray-700 font-bold mb-2">
                Account Number
                </label>
                <input
                id="accountNumber"
                type="text"
                placeholder="Enter account number"
                className="border border-gray-300 rounded-md p-2 w-full"
                //   value={accountNumber}
                //   onChange={handleAccountNumberChange}
                />
            </div> */}

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

            {/* <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
                </label>
                <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="border border-gray-300 rounded-md p-2 w-full"
                //   value={email}
                //   onChange={handleEmailChange}
                />
            </div> */}

            <div className="relative overflow-hidden">
                <div 
                className={`absolute top-0 left-0 h-6  bg-blue-500 transition-all duration-300 ease-in-out`}
                   style={{ width: `${sliderValue}%` }}
                ></div>
            </div>
                <div>
                    
            <Slider />
                </div>
                <br></br>
            {!isSliderActive && (
                <button 
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                //onClick={handleTransfer}
                >
                Transfer
                </button>
            )}
            
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
                    <img src="2.jpg" alt="Image 1" />
                    </SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                </Swiper>
            </div>
        </div>
        </div>
        </div>
        </>
    );
}
export default Loan