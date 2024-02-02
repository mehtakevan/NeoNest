import { Button } from "@chakra-ui/button";
import {Box,CloseButton} from '@chakra-ui/react'
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();
  // const history = useHistory();

  const [username, setusername] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [panNumber, setPan] = useState();
  const [contact, setContact] = useState();
  const [age, setAge] = useState();

  const submitHandler = async () => {
    console.log("Helllo   ");
    console.log("email ", email)
    console.log("Name ", username)
    console.log("Password ", password)
    console.log("panNumber ", panNumber)
    console.log("Contact ", contact)
    console.log("Age ", age)
    if (!username || !email || !password || !confirmpassword || !panNumber || !contact || !age) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailPattern.test(email)){
      toast({
        title: "Please enter correct email",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const panPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;
    if(!panPattern.test(panNumber)){
      toast({
        title : "panNumber is Not proper",
        status : "warning",
        duration : 5000,
        isClosable : true,
        position : "bottom",
      });
      return;
    }
    const contactPattern = /^[0-9]{10}$/
    if(!contactPattern.test(contact)){
      toast({
        title : "Enter Correct Contact Number",
        status : "warning",
        duration : 5000,
        isClosable : true,
        position : "bottom",
      });
      return;
    }
    if(age < 18){
      toast({
        title : "Age Should be greater 18",
        status : "warning",
        duration : 5000,
        isClosable : true,
        position : "bottom",
      });
      return;
    }
    console.log(username, email, password, contact, panNumber, age);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data  = await axios.post(
        "http://localhost:5000/api/user",
        {
          username,
          email,
          password,
          panNumber,
          age,
          contact
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/verifyotp');
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        //description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
       <div className="h-screen overflow-y-scroll ">
       <div className="w-full h-screen flex items-center justify-center pt-6 bg-black">
  
    <div className=" rounded-lg shadow-2xl dark:border dark:bg-gray-900 dark:border-gray-700 bg-gradient-to-r from-gray-500 to-transparent p-6 md:p-10 lg:p-14 xl:p-20 w-full md:w-1/2">
       <span className="text-white mb-3 text-2xl md:text-4xl font-bold ">Create an Account</span>
           <span className="font-light justify-center text-gray-400 mb-4 md:mb-8">
             Get started by creating your account
           </span>
           
   {/* <VStack spacing="5px"> */}
   <div className="py-2 md:py-4">
   <FormLabel>User Name</FormLabel>
     <FormControl id="username" isRequired>
       <input
         className="w-1/2 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         placeholder="Enter Your Name"
         onChange={(e) => setusername(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="email" isRequired>
     <FormLabel>Email Address</FormLabel>
       <input
         className="w-1/2 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="email"
         placeholder="Enter Your Email Address"
         onChange={(e) => setEmail(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="password" isRequired>
     <FormLabel>Password</FormLabel>
       <InputGroup size="md">
         <input
         className="mx-auto w-1/2 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
           type={show ? "text" : "password"}
           placeholder="Enter Password"
           onChange={(e) => setPassword(e.target.value)}
         />
         <InputRightElement width="4.5rem">
           <Button h="1.75rem" size="sm" onClick={handleClick}>
             {show ? "Hide" : "Show"}
           </Button>
         </InputRightElement>
       </InputGroup>
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="consfirmpassword" isRequired>
     <FormLabel>Confirm Password</FormLabel>
       <InputGroup size="md">
         <input
           className="mx-auto w-1/2 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
           type={show ? "text" : "password"}
           placeholder="Confirm password"
           onChange={(e) => setConfirmpassword(e.target.value)}
         />
         <InputRightElement width="4.5rem">
           <Button h="1.75rem" size="sm" onClick={handleClick}>
             {show ? "Hide" : "Show"}
           </Button>
         </InputRightElement>
       </InputGroup>
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="panNumber">
     <FormLabel>Pan Number</FormLabel>
       <input
         className="mx-auto w-1/2 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="text"
         placeholder="Enter Your PanNumber"
         onChange={(e) => setPan(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="contact">
     <FormLabel>Contact Number</FormLabel>
       <input
         className="w-1/2 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="text"
         placeholder="Enter your Contact Number"
         onChange={(e) => setContact(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="age">
     <FormLabel>Age</FormLabel>
       <input
         className="w-1/2 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="Number"
         placeholder="Enter Your Age"
         onChange={(e) => setAge(e.target.value)}
       />
     </FormControl>
     </div>


     <button
      //  colorScheme="blue"
       width="100%"
       className="w-1/2 mt-10 mb-0 border bg-gray-300 border-gray-300 text-sm md:text-md p-2 rounded-lg mb-4 md:mb-6 hover:bg-black hover:text-white"
       onClick={submitHandler}
       // isLoading={picLoading}
     >
       Sign Up
     </button>
     {/* </VStack> */}
     </div>
     </div>
     </div>
     {/* </div> */}
    
     </>
 );
};
export default Signup;

  