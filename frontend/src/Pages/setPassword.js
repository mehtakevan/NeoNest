import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SetPassword = () => {
  // console.log("HELIIEEEEEEE ");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [confirmpassword, setConfirmpassword] = useState();
  const [pass, setPass] = useState();
  // let email;
  const currentUrl = window.location.href;

  // Create a URL object
  const url = new URL(currentUrl);

  // Access the search parameters using URLSearchParams
  const queryParams = new URLSearchParams(url.search);

  // Get individual parameter values
  const email = queryParams.get('email');

  const changePassword = async () => {
    console.log("HEELLLLLOOO  ");
    if (!pass || !confirmpassword) {
      toast.error(
        "Please fill all the fields.",
        {style : {
          background:"orange",
          color:"white"
        }}
      );
        return;
      }

    if (pass !== confirmpassword) {
      toast.error(
        "Passwords do not match.",
        {style : {
          background:"red",
          color:"white"
        }}
      );
        return;
    }
    console.log(pass)
    console.log(confirmpassword)
    console.log(email)
    try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const data  = await axios.post(
          "http://localhost:5000/api/user/setpassword",
          {
            email,
            pass, 
            confirmpassword
          },
          config
        );
        console.log(data);
        toast.success(
          "Password changed successfully.",
          {style : {
            background:"green",
            color:"white"
          }}
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        console.log(error)
        toast.error(
          "Error occurred",
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
              Change Password
            </h2>
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <FormControl id="newpassword" isRequired >
              <div>
                <FormLabel
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </FormLabel>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPass(e.target.value)}
                ></input>
              </div>
              </FormControl>

              <FormControl>
              <div>
              <FormLabel
                  htmlFor="confirmpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
              </FormLabel>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setConfirmpassword(e.target.value)}
                ></input>
              </div>
              </FormControl>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                      </a>
                  </label>
                </div>
              </div>
            
            <Button
              onClick={() => changePassword()}
              className="mt-3 w-50% text-black bg-gray-100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </Button>
            </div>
          </div>
        </div>
      </section>
    </div>

        
    );
}

export default SetPassword