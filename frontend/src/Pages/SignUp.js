import { Button } from "@chakra-ui/button";
import { Box, CloseButton } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();
  // const history = useHistory();
  const item = JSON.parse(localStorage.getItem("aadharInfo"));
  const [userName, setuserName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [panNumber, setPan] = useState();
  const [contact, setContact] = useState();
  const [age, setAge] = useState();

  const getData = async (email) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = await axios.post(
        "https://neonest-backend.vercel.app/api/user/getuserdata",
        { email },
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      const fetchData = async () => {
        const email = item.data.aadhar.email;
        console.log("Hey from Signup");
        console.log(email);

        console.log(email);
        const data = await getData(email);

        console.log("-------------------------------");
        console.log(data.data.data.email);
        setuserName(data.data.data.name);
        setEmail(data.data.data.email);
        setPan(data.data.data.panNumber);
        setContact(data.data.data.contact);
        setAge(data.data.data.age);
      };
      fetchData();
    },
    []);

  const submitHandler = async () => {
    console.log("Helllo   ");
    console.log("email ", email);
    console.log("Name ", userName);
    console.log("Password ", password);
    console.log("panNumber ", panNumber);
    console.log("Contact ", contact);
    console.log("Age ", age);
    if (
      !userName ||
      !email ||
      !password ||
      !confirmpassword ||
      !panNumber ||
      !contact ||
      !age
    ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
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
    if (!panPattern.test(panNumber)) {
      toast({
        title: "panNumber is Not proper",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const contactPattern = /^[0-9]{10}$/;
    if (!contactPattern.test(contact)) {
      toast({
        title: "Enter Correct Contact Number",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (age < 18) {
      toast({
        title: "Age Should be greater 18",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(userName, email, password, contact, panNumber, age);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        "https://neonest-backend.vercel.app/api/user",
        {
          userName,
          email,
          password,
          panNumber,
          age,
          contact,
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
      navigate("/");
    } catch (error) {
      console.log(error);
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
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-start bg-white  ">
        <div className=" h-screen flex-col md:flex-row justify-center items-start md:pl-10 h-auto bg-white ">
          <div class="mx-auto container rounded-lg shadow-2xl dark:border dark:bg-gray-900 dark:border-gray-700 h-full bg-gradient-to-r from-teal-500 to-teal-200">
            <div className="w-full flex ms-4 items-center justify-center pb-10">
              <div className="text-center">
                <span className="mb-3 text-2xl md:text-4xl font-bold">
                  Create an Account
                </span>
                <br></br>
                <span className="font-light text-gray-400 mb-4 md:mb-8">
                  Get started by creating your account
                </span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 w-full">
              <div class="w-full mx-2 flex justify-center">
                <div className="grid grid-rows-4">
                  <div className="py-2 md:py-4">
                    <span className="mb-2 text-sm md:text-md">User Name</span>
                    <FormControl id="userName" isRequired>
                      {/* <FormLabel>Name</FormLabel> */}
                      <input
                        className="w-full bg-gray-300 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                        readOnly
                      />
                    </FormControl>
                  </div>

                  <div className="py-2 md:py-4">
                    <FormControl id="email" isRequired>
                      <span className=" mb-2 text-sm md:text-md">
                        Email Address
                      </span>
                      <input
                        className="w-full bg-gray-300 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly
                      />
                    </FormControl>
                  </div>

                  <div className="py-2 md:py-4">
                    <FormControl id="password" isRequired>
                      <span className="mb-2 text-sm md:text-md">Password</span>
                      <InputGroup size="md">
                        <input
                          className="w-full bg-gray-300 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
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
                      <span className="mb-2 text-sm md:text-md">
                        Confirm Password
                      </span>
                      <InputGroup size="md">
                        <input
                          className="w-full bg-gray-300 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
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
                </div>
              </div>

              <div class="w-full mx-2 flex justify-center">
                <div className="grid grid-rows-4">
                  <div className="py-2 md:py-4">
                    <FormControl id="panNumber">
                      <span className="mb-2 text-sm md:text-md">PanNumber</span>
                      <input
                        className="w-full bg-gray-300 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        type="text"
                        value={panNumber}
                        onChange={(e) => setPan(e.target.value)}
                        readOnly
                      />
                    </FormControl>
                  </div>

                  <div className="py-2 md:py-4">
                    <FormControl id="contact">
                      <span className="mb-2 text-sm md:text-md">
                        Contact Number
                      </span>
                      <input
                        className="w-full bg-gray-300 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        readOnly
                      />
                    </FormControl>
                  </div>

                  <div className="py-2 md:py-4">
                    <FormControl id="age">
                      <span className="mb-2 text-sm md:text-md">Age</span>
                      <input
                        className="w-full bg-gray-300 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        type="Number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        readOnly
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <button
              color="black"
              colorScheme="blue"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={submitHandler}
              className="w-1/2 p-0 ms-24 justify-center border border-gray-300 text-sm md:text-md rounded-lg mb-4 md:mb-6 hover:bg-black hover:text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <iframe
            src="https://giphy.com/embed/NyniJ2Nf2ZzlE8GYsl"
            width="400"
            height="100"
            frameBorder="0"
            className="w-screen h-screen mt-40 mr-40 md:block object-cover rounded-r-2xl"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};
export default Signup;
