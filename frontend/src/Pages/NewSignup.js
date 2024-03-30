import { Button } from "@chakra-ui/button";
import { Box, CloseButton } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { useHistory } from "react-router";

const NewSignup = () => {
  const navigate = useNavigate();
  // const history = useHistory();

  const [aadhar, setAadhar] = useState("");

  const submitHandler = async () => {
    console.log("Helllo   ");
    console.log("aadhar ", aadhar);
    if (!aadhar) {
      toast.error(
        "Please fill the AADHAR Number.",
        {style : {
          background:"orange",
          color:"white"
        }}
      );
      return;
    }
    const aadhaarPattern = /^\d{12}$/;
    if (!aadhaarPattern.test(aadhar)) {
      toast.error(
        "Please enter correct AADHAR Number",
        {style : {
          background:"orange",
          color:"white"
        }}
      );
      return;
    }

    console.log(aadhar);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        "https://neonest-backend.vercel.app/api/user/aadharsignup",
        {
          aadhar,
        },
        config
      );
      console.log(data);
      toast.success(
        "Registration successful",
        {style : {
          background:"green",
          color:"white"
        }}
      );
      localStorage.setItem("aadharInfo", JSON.stringify(data));
      navigate("/verifyotp");
    } catch (error) {
      console.log(error);
      toast.error(
        "Error occured",
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
                    <span className="mb-2 text-sm md:text-md">
                      Aadhar Number
                    </span>
                    <FormControl id="aadhar" isRequired>
                      {/* <FormLabel>Name</FormLabel> */}
                      <input
                        className="w-full bg-gray-300 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        placeholder="Enter Your Aadhar Number"
                        onChange={(e) => setAadhar(e.target.value)}
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
              // isLoading={picLoading}
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
export default NewSignup;
