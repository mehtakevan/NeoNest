const SignUp = () => {
    return (
      <>
        <div className="w-full h-screen flex flex-col md:flex-row items-start md:pl-10 lg:pl-20 xl:pl-40">
          <div className="flex flex-col justify-center p-4 md:p-10 lg:p-14 xl:p-20 w-full md:w-1/2">
            <span className="mb-3 text-2xl md:text-4xl font-bold">Create an Account</span>
            <span className="font-light text-gray-400 mb-4 md:mb-8">
              Get started by creating your account
            </span>
            <div className="py-2 md:py-4">
              <span className="mb-2 text-sm md:text-md">Full Name</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="fullName"
                id="fullName"
              />
            </div>
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
                name="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full py-2 md:py-4">
              <div className="flex items-center mb-2 md:mb-0">
                <input type="checkbox" name="terms" id="terms" className="mr-2" />
                <span className="text-sm md:text-md">
                  I agree to the <a href="#">terms</a> and <a href="#">privacy policy</a>
                </span>
              </div>
            </div>
            <button
              className="w-full bg-black text-white p-2 rounded-lg mb-4 md:mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Sign up
            </button>
            <div className="text-center text-gray-400">
              Already have an account?
              <span className="font-bold text-black"> Sign in</span>
            </div>
          </div>
  
          <div className="relative hidden">
            <iframe
              src="https://giphy.com/embed/kPJhdps6xaQoAPCYxC"
              width="100%"
              height="100%"
              frameBorder="0"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
              allowFullScreen
            ></iframe>
            <div className="absolute hidden bottom-5 right-2 p-4 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
              {/* Additional content for the right side if needed */}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default SignUp;
  