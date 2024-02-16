import Slider from "../components/Slider/slider";
import Sidebar from "../components/SideBar/Sidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useToast } from "@chakra-ui/toast";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useState } from "react";
import axios from "axios";
import { useHistory, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./getLoan.css";

const Loan = () => {
  const [amount, setAmount] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();
  const item = JSON.parse(localStorage.getItem("userInfo"));

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
        toast({
          title: "Transaction Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/dashboard");
      }
      console.log("Transfer initiated");
    } catch (error) {
      // Handle the transfer logic
      toast({
        title: "Error Occurred. Please Try it after some time",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/dashboard");
      console.log(error);
    }

    // Handle the transfer logic
    console.log("Loan Avail");
  };

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

              {/* <div className="mb-4">
                <label htmlFor="accountNumber" className="block text-gray-700 font-bold mb-2">
                  Account Number
                </label>
                <input
                  id="accountNumber"
                  type="text"
                  placeholder="Enter account number"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  //value={accountNumber}
                  //onChange={handleAccountNumberChange}
                />
              </div> */}

              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 font-bold mb-2"
                >
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

              {/* <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                
              </div> */}

              <div></div>
              <br></br>

              
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                  onClick={handleLoan}
                >
                  Avail
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Loan;
