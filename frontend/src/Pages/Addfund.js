import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useHistory, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import './AddFund.css';
import toast from 'react-hot-toast';

const Addfund = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const item = JSON.parse(localStorage.getItem('userInfo'));
  const email = item.email;

  const submitHandler = async () => {
    if (!amount) {
      toast.error(
        "Please fill the amount to credit.",
        {style : {
          background:"red",
          color:"white"
        }}
      );
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data  = await axios.post(
        "http://localhost:5000/api/transaction/createorder",
        { amount },
        config
      );
      console.log(data.data.order);
      var options = {
        "key": "rzp_test_4jBEIDzdbYVvAZ", // Enter the Key ID generated from the Dashboard
        "amount": data.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "NeoNest",
        "description": "Crediting funds to your account",
        "image": "https://example.com/your_logo",
        "order_id": data.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response){
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);

            const res = await axios.post(
                "http://localhost:5000/api/transaction/addfund",
                { email,amount },
                config
            )
            console.log(res);
            if(res.data === "transaction successful"){
              toast.success(
                "Funds added to your account",
                {style : {
                  background:"green",
                  color:"white"
                }}
              );
                navigate('/dashboard')
            }
            else{
              toast.success(
                "Might take some time to credit the balance.",
                {style : {
                  background:"green",
                  color:"white"
                }}
              );
                navigate('/dashboard')
            }
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            toast.error(
              "Some error Occurred. Please try again in some time",
              {style : {
                background:"red",
                color:"white"
              }}
            );
            navigate('/dashboard')
    });

    rzp1.open();
    // e.preventDefault();

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="addfund-container"> {/* Apply transfer-container class */}
  
      <div className="form-container"> 
      <div className="flex justify-center items-center">
          <div className="w-1/2 bg-gray-100 p-8">
            <h1 className="text-2xl mb-4">Add Your Funds</h1>
          <span className="font-light text-black mb-4 md:mb-8">
            Add To Account
          </span>

          <div className="mb-4">
              <label htmlFor="accountNumber" className="block text-gray-700 font-bold mb-2">
                Amount
              </label>
              <input
                id="email"
                type="Number"
                placeholder="Enter amount to add"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            </div>
         

            
        </div>
        {/* <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                onClick={submitHandler}
              >
                Let's Credit
              </button> */}
              <button
  className="text-white py-2 px-4 rounded-md mt-4"
  style={{ 
    backgroundColor: 'rgb(6, 80, 88)',
    transition: 'background-color 0.3s', // Optional: add transition for smooth hover effect
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(6, 80, 88)'} // Set background color on hover
  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(6, 80, 88)'} // Reset background color on hover out
  onClick={submitHandler}
>
  Let's Credit
</button>
      </div>
     
    </div>
 </>
);
};



export default Addfund;