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
        description: error.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-start bg-white pr-20 pt-20">
  <div className="  h-screen flex-col md:flex-row justify-center items-start md:pl-10 lg:pl-20 xl:pl-40 bg-white pr-20 pt-20">
  <div className=" rounded-lg shadow-2xl dark:border dark:bg-gray-900 dark:border-gray-700 bg-gradient-to-r from-teal-500 to-teal-200">
    <div className="flex flex-col justify-center p-4 md:p-10 lg:p-14 xl:p-20 w-full">
      <span className="mb-3 text-2xl md:text-4xl font-bold text-black">Welcome back</span>
      <span className="font-light text-white mb-4 md:mb-8">
        Welcome back! Please enter your details
      </span>

      <div className="py-2 md:py-4">
        <FormControl id="email" isRequired>
          <span className="mb-2 text-sm md:text-md text-white">Email</span>
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
        className="w-full border bg-gray-300 border-gray-300 text-sm md:text-md p-2 rounded-lg mb-4 md:mb-6 hover:bg-black hover:text-white"
      >
        Login
      </button>
      <a href="http://localhost:3000/forgotpassword"><div className="hover:underline">Forgot Password?</div></a>
    </div>
    </div>
  </div>
  <iframe
    src="https://giphy.com/embed/kPJhdps6xaQoAPCYxC"
    width="100%"
    height="100%"
    frameBorder="0"
    className="w-full h-3/4 pt-20 hidden md:block object-cover rounded-r-2xl"
    allowFullScreen
  ></iframe>
  {/* <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" /> */}
</div>

  );
};

export default Login;
