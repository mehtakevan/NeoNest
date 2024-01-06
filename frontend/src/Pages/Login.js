// // //import '../assets/tailwind.css'

// const Login = () => {
//     // const navigate = useNavigate()
//     // const dispatch = useDispatch()
//     // const onfinishHandler = async(values) => {
//     //   try{
//     //     dispatch(showLoading())
//     //     const res = await axios.post('/api/v1/user/login', values)
//     //     window.location.reload()
//     //     dispatch(hideLoading())
//     //     if(res.data.success){
//     //       localStorage.setItem("token", res.data.token);
//     //       message.success('Login Successfully');
//     //       navigate('/')
//     //     }
  
//     //   } catch(error) {
//     //     dispatch(hideLoading())
//     //     console.log(error)
//     //     message.error('Something went wrong')
//     //   }
//     // }
//     return (
      
//       <>
      
//       <div className = "w-full h-screen flex itens-start pl-80">
//       {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div
//         className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
//       > */}
        
//         <div className="flex flex-col justify-center p-8 md:p-14">
//           <span className="mb-3 text-4xl font-bold">Welcome back</span>
//           <span className="font-light text-gray-400 mb-8">
//             Welcome back! Please enter your details
//           </span>
//           <div className="py-4">
//             <span className="mb-2 text-md">Email</span>
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
//               name="email"
//               id="email"
//             />
//           </div>
//           <div className="py-4">
//             <span className="mb-2 text-md">Password</span>
//             <input
//               type="password"
//               name="pass"
//               id="pass"
//               className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
//             />
//           </div>
//           <div className="flex justify-between w-full py-4">
//             <div className="mr-24">
//               <input type="checkbox" name="ch" id="ch" className="mr-2" />
//               <span className="text-md">Remember for 30 days</span>
//             </div>
//             <span className="font-bold text-md">Forgot password</span>
//           </div>
//           <button
//             className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
//           >
//             Sign in
//           </button>
//           <button
//             className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
//           >
//             <img src="google.svg" alt="img" className="w-6 h-6 inline mr-2" />
//             Sign in with Google
//           </button>
//           <div className="text-center text-gray-400">
//             Dont'have an account?
//             <span className="font-bold text-black">Sign up for free</span>
//           </div>
//         </div>
        
//         <div className="relative">
//           {/* <img
//             src="image.jpg"
//             alt="img"
//             className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
//           /> */}
//           <iframe src="https://giphy.com/embed/kPJhdps6xaQoAPCYxC" width="100%" height="80%"  frameBorder="0"  className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover" allowFullScreen></iframe>
//           {/*<p><a href="https://giphy.com/gifs/JustStartInvesting-kPJhdps6xaQoAPCYxC">via GIPHY</a></p> */}
           
//           <div
//             className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
//           >
//             {/* <span className="text-white text-xl"
//               >We've been uesing Untitle to kick"<br />start every new project
//               and can't <br />imagine working without it."
//             </span> */}
//           </div>
//         </div>
//       {/* </div>
//     </div> */}
//     </div>
//   </>
//     )
//   }
  
const Login = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col md:flex-row items-start md:pl-10 lg:pl-20 xl:pl-40">
        <div className="flex flex-col justify-center p-4 md:p-10 lg:p-14 xl:p-20 w-full md:w-1/2">
          <span className="mb-3 text-2xl md:text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-4 md:mb-8">
            Welcome back! Please enter your details
          </span>
          <div className="py-2 md:py-4">
            <span className="mb-2 text-sm md:text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
            />
          </div>
          <div className="py-2 md:py-4">
            <span className="mb-2 text-sm md:text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full py-2 md:py-4">
            <div className="flex items-center mb-2 md:mb-0">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-sm md:text-md">Remember for 30 days</span>
            </div>
            <span className="font-bold text-sm md:text-md">Forgot password</span>
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-4 md:mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Sign in
          </button>
          {/* <button
            className="w-full border border-gray-300 text-sm md:text-md p-2 rounded-lg mb-4 md:mb-6 hover:bg-black hover:text-white"
          >
            <img src="google.svg" alt="img" className="w-5 h-5 md:w-6 md:h-6 inline mr-2" />
            Sign in with Google
          </button> */}
          <div className="text-center text-gray-400">
            Don't have an account?
            <span className="font-bold text-black"> Sign up for free</span>
          </div>
        </div>

        {/* <div className="relative hidden "> */}
          {/* <iframe
            src="https://giphy.com/embed/kPJhdps6xaQoAPCYxC"
            width="100%"
            height="100%"
            frameBorder="0"
            className="w-full h-full hidden rounded-r-2xl object-cover"
            allowFullScreen
          ></iframe> */}
          <iframe src="https://giphy.com/embed/kPJhdps6xaQoAPCYxC" width="100%" height="100%"  frameBorder="0"  className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover" allowFullScreen></iframe>
          <div className="absolute hidden bottom-5 right-2 p-4 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            {/* Additional content for the right side if needed */}
          </div>
        {/* </div> */}
      </div>
    </>
  );
};


export default Login