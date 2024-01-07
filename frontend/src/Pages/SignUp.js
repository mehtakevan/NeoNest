// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";


// const SignUp = () => {
    
//   const submitHandler = async () => {

//   };



//     return (
//       // <>
//       //   <div className="w-full h-screen flex flex-col md:flex-row items-start md:pl-10 lg:pl-20 xl:pl-40">
//       //     <div className="flex flex-col justify-center p-4 md:p-10 lg:p-14 xl:p-20 w-full md:w-1/2">
//       //       <span className="mb-3 text-2xl md:text-4xl font-bold">Create an Account</span>
//       //       <span className="font-light text-gray-400 mb-4 md:mb-8">
//       //         Get started by creating your account
//       //       </span>
//       //       <div className="py-2 md:py-4">
//       //         <span className="mb-2 text-sm md:text-md">User Name</span>
//       //         <input
//       //           type="text"
//       //           className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
//       //           name="fullName"
//       //           id="fullName"
//       //         />
//       //       </div>
//       //       <div className="py-2 md:py-4">
//       //         <span className="mb-2 text-sm md:text-md">Email</span>
//       //         <input
//       //           type="email"
//       //           className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
//       //           name="email"
//       //           id="email"
//       //         />
//       //       </div>
//       //       <div className="py-2 md:py-4">
//       //         <span className="mb-2 text-sm md:text-md">Password</span>
//       //         <input
//       //           type="password"
//       //           name="password"
//       //           id="password"
//       //           className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
//       //         />
//       //       </div>
//       //       <div className="py-2 md:py-4">
//       //         <span className="mb-2 text-sm md:text-md">Age</span>
//       //         <input
//       //           type="number"
//       //           name="age"
//       //           id="age"
//       //           className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
//       //         />
//       //       </div>
//       //       <div className="py-2 md:py-4">
//       //         <span className="mb-2 text-sm md:text-md">Contact Number</span>
//       //         <input
//       //           type="text"
//       //           maxlength = "10"
//       //           minlength = "10"
//       //           name="contact"
//       //           id="contact"
//       //           className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
//       //         />
//       //       </div>
//       //       <div className="py-2 md:py-4">
//       //         <span className="mb-2 text-sm md:text-md">panNumber Number</span>
//       //         <input
//       //           pattern = "[A-Z]{5}[0-9]{4}[A-Z]{1}"
//       //           type="text"
//       //           name="panNumber"
//       //           id="panNumber"
//       //           className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
//       //         />
//       //       </div>
//       //       <div className="flex flex-col md:flex-row justify-between w-full py-2 md:py-4">
//       //         <div className="flex items-center mb-2 md:mb-0">
//       //           <input type="checkbox" name="terms" id="terms" className="mr-2" />
//       //           <span className="text-sm md:text-md">
//       //             I agree to the <a href="#">terms</a> and <a href="#">privacy policy</a>
//       //           </span>
//       //         </div>
//       //       </div>
//       //       <button
//       //         className="w-full bg-black text-white p-2 rounded-lg mb-4 md:mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
//       //         onClick={submitHandler}
//       //       >
//       //         Sign up
//       //       </button>
//       //       <div className="text-center text-gray-400">
//       //         Already have an account?
//       //         <span className="font-bold text-black"> Sign in</span>
//       //       </div>
//       //     </div>
  
//       //     <div className="relative hidden">
//       //       <iframe
//       //         src="https://giphy.com/embed/kPJhdps6xaQoAPCYxC"
//       //         width="100%"
//       //         height="100%"
//       //         frameBorder="0"
//       //         className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
//       //         allowFullScreen
//       //       ></iframe>
//       //       <div className="absolute hidden bottom-5 right-2 p-4 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
//       //         {/* Additional content for the right side if needed */}
//       //       </div>
//       //     </div>
//       //   </div>
//       // </>
//   };
  
//   export default SignUp;

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
// import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
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
        "http://192.168.126.171:5000/api/user",
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
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
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
   <VStack spacing="5px">
   <div className="py-2 md:py-4">
     {/* <span className="mb-2 text-sm md:text-md">User Name</span> */}
     <FormControl id="username" isRequired>
       <FormLabel>Name</FormLabel>
       <Input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         placeholder="Enter Your Name"
         onChange={(e) => setusername(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="email" isRequired>
       <FormLabel>Email Address</FormLabel>
       <Input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
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
         <Input
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
       <FormLabel>Confirm Password</FormLabel>
       <InputGroup size="md">
         <Input
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
       <FormLabel>PanNumber</FormLabel>
       <Input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="text"
         placeholder="Enter Your PanNUmber"
         onChange={(e) => setPan(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="contact">
       <FormLabel>Conatct Number</FormLabel>
       <Input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="text"
         placeholder="Enter your COntact Number"
         onChange={(e) => setContact(e.target.value)}
       />
     </FormControl>
     </div>


     <div className="py-2 md:py-4">
     <FormControl id="age">
       <FormLabel>Age</FormLabel>
       <Input
         className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
         type="Number"
         placeholder="Enter Your Age"
         onChange={(e) => setAge(e.target.value)}
       />
     </FormControl>
     </div>


     <Button
      //  colorScheme="blue"
       width="100%"
       style={{ marginTop: 15 }}
       onClick={submitHandler}
       // isLoading={picLoading}
     >
       Sign Up
     </Button>
     </VStack>
     </div>
     </div>
     </>
 );
};
export default Signup;

  