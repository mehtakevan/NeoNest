import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory, useNavigate } from "react-router-dom";

const Addfund = () => {
  const [amount, setAmount] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();

  const item = JSON.parse(localStorage.getItem('userInfo'));
  const email = item.email;


  const submitHandler = async () => {
    if (!amount) {
      toast({
        title: "Please Fill the amount to credit",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
                toast({
                    title: "Funds Added to your Account",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                navigate('/dashboard')
            }
            else{
                toast({
                    title: "Might take some time to credit the balance",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
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
            toast({
                title: "Some error occured Please try again after sometime",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            navigate('/dashboard')
    });

    rzp1.open();
    // e.preventDefault();

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-start bg-white pr-20 pt-20">
      <div className="  h-screen flex-col md:flex-row justify-center items-start md:pl-10 lg:pl-20 xl:pl-40 bg-white pr-20 pt-20">
        <div className=" rounded-lg shadow-2xl dark:border dark:bg-gray-900 dark:border-gray-700 bg-gradient-to-r from-teal-500 to-teal-200">
          <div className="flex flex-col justify-center p-4 md:p-10 lg:p-14 xl:p-20 w-full">
            <span className="mb-3 text-2xl md:text-4xl font-bold text-black">
              Add To Account
            </span>
            <span className="font-light text-white mb-4 md:mb-8">
              Add Funds to your account
            </span>

            <div className="py-2 md:py-4">
              <FormControl id="email" isRequired>
                <span className="mb-2 text-sm md:text-md text-white">
                  Amount
                </span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  value={amount}
                  type="Number"
                  placeholder="Enter the Amount to Add"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
            </div>

            <button
              color="black"
              colorScheme="blue"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={submitHandler}
              className="w-full border bg-gray-300 border-gray-300 text-sm md:text-md p-2 rounded-lg mb-4 md:mb-6 hover:bg-black hover:text-white"
            >
              Let's Credit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addfund;