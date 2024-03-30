import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast'

const ForgotPassword = () => {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    
    
    const [email, setEmail] = useState();
    // const [confirmpassword, setConfirmpassword] = useState();
    // const [password, setPassword] = useState();

    const submitHandler = async () => {
        if (!email) {
          toast.error(
            "Please enter your email",
            {style : {
              background:"red",
              color:"white"
            }}
          );
            return;
          }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailPattern.test(email)){
          toast.error(
            "Please enter your correct email.",
            {style : {
              background:"orange",
              color:"white"
            }}
          );
            return;
        }
        console.log(email)
        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const data  = await axios.post(
              "https://neonest-backend.vercel.app/api/user/forgotpassword",
              {
                email
              },
              config
            );
            console.log(data);
            toast.success(
              "Email sent",
              {style : {
                background:"green",
                color:"white"
              }}
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
          } catch (error) {
            console.log(error)
            toast.error(
              "Error Occurred.",
              {style : {
                background:"red",
                color:"white"
              }}
            );
            // toast({
            //   title: "Error Occured!",
            //   //description: error.response.data.message,
            //   status: "error",
            //   duration: 5000,
            //   isClosable: true,
            //   position: "bottom",
            // });
          }
    }
  
      return (
          <div>
        <section className="bg-gray-50 w-screen dark:bg-white">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-900 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Please Enter Your Email!
              </h2>
              <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <FormControl id="email" isRequired >
                <div>
                  <FormLabel
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </FormLabel>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="abc@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setEmail(e.target.value)}
                    required=""
                  ></input>
                </div>
                </FormControl>
              
              <Button
                onClick={submitHandler}
                className="mt-3 w-50% text-black bg-gray-100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send Mail
              </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
  
          
      );
  }
  
  export default ForgotPassword