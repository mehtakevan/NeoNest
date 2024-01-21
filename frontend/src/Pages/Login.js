import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory,useNavigate } from "react-router-dom";


const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const history = useHistory();
  // const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const {data}  = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );
      // console.log(data.msg);
      if(data.msg == "Mail sent for verification"){
        toast({
          title: "Mail sent",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify({data:{email}}));
        navigate('/verifyotp');
      }
      else{
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      // setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data)); 
      navigate('/dashboard')
      }
      setLoading(false);
      // history.push("/chats");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 w-full h-screen flex flex-col md:flex-row items-start md:pl-10 lg:pl-20 xl:pl-40">
         <div className="flex flex-col justify-center p-4 md:p-10 lg:p-14 xl:p-20 w-full md:w-1/2">
           <span className="mb-3 text-2xl md:text-4xl font-bold">Welcome back</span>
           <span className="font-light text-gray-400 mb-4 md:mb-8">
             Welcome back! Please enter your details
          </span>
     {/* <div className="mt-40 "> */}
    {/* <VStack spacing="10px"> */}
    <div className="py-2 md:py-4">
      <FormControl id="email" isRequired>
        <span className="mb-2 text-sm md:text-md">Email</span>
        <input
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      </div>

      <button
        color="black"
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        className="w-full border border-gray-300 text-sm md:text-md p-2 rounded-lg mb-4 md:mb-6 hover:bg-black hover:text-white"
      >
        Login
      </button>
    {/* </VStack> */}
    </div>
    </div>
    // </div>
  );
};

export default Login;
