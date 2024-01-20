import { Button } from "@chakra-ui/button";
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
    
      <div className="w-full h-screen flex flex-col md:flex-row items-start md:pl-10 lg:pl-20 xl:pl-40">
       <div className="flex flex-col justify-center p-4 md:p-10 lg:p-14 xl:p-20 w-full md:w-1/2">
       <span className="mb-3 text-2xl md:text-4xl font-bold">Create an Account</span>
           <span className="font-light text-gray-400 mb-4 md:mb-8">
             Get started by creating your account
           </span>
   {/* <VStack spacing="5px"> */}
   <div className="py-2 md:py-4">
     <span className="mb-2 text-sm md:text-md">User Name</span>
     <FormControl id="username" isRequired>
       {/* <FormLabel>Name</FormLabel> */}
       <input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         placeholder="Enter Your Name"
         onChange={(e) => setusername(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="email" isRequired>
     <span className="mb-2 text-sm md:text-md">Email Address</span>
       <input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="email"
         placeholder="Enter Your Email Address"
         onChange={(e) => setEmail(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="password" isRequired>
     <span className="mb-2 text-sm md:text-md">Password</span>
       <InputGroup size="md">
         <input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
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
     <span className="mb-2 text-sm md:text-md">Confirm Password</span>
       <InputGroup size="md">
         <input
           className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
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
     <span className="mb-2 text-sm md:text-md">PanNUmber</span>
       <input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="text"
         placeholder="Enter Your PanNUmber"
         onChange={(e) => setPan(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="contact">
     <span className="mb-2 text-sm md:text-md">Contact Number</span>
       <input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="text"
         placeholder="Enter your COntact Number"
         onChange={(e) => setContact(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="age">
     <span className="mb-2 text-sm md:text-md">Age</span>
       <input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="Number"
         placeholder="Enter Your Age"
         onChange={(e) => setAge(e.target.value)}
       />
     </FormControl>
     </div>


     <button
      //  colorScheme="blue"
       width="100%"
       style={{ marginTop: 15 }}
       onClick={submitHandler}
       // isLoading={picLoading}
     >
       Sign Up
     </button>
     {/* </VStack> */}
     </div>
     </div>
     
     </>
 );
};
export default Signup;

  