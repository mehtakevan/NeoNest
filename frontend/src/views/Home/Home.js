// Home.js
import React from 'react';
import './Home.css';
import GoogleFontLoader from 'react-google-font-loader';
import { Link } from 'react-router-dom';
import styles from "../../style";
import discount from '../../assets/Discount.svg'
import robot from '../../assets/robot.png'
import Slide from './Slide';
import Footer from '../Footer';
import Business from './Bussiness';
import Billing from './Billing';
import CardDeal from './CardDeal';

const Home = () => {
  return (
    <>
    
      
      <div>
        <GoogleFontLoader fonts={[{ font: 'Playfair Display', weights: [600, 700] }]} />
        <div className="home-container">
          <div className="content">
            {/* Updated button container with new className */}
            <div className="button-container">
              {/* Rounded buttons for login and signup */}
              <Link to="/login" className="rounded-button login">
                Log In
              </Link>
              <Link to="/signup" className="rounded-button signup">
                SignUp
              </Link>x
            </div>
          </div>
        </div>
        <Slide />
      </div>
      
                          {/* </div> */}
      <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} bg-white-900`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
          {/* <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-gray-500">20%</span> Discount For{" "}
            <span className="text-gray-500">1 Month</span> Account
          </p>
        </div> */}

          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold text-gray-500 ss:text-[72px] text-[52px] ss:leading-[100.8px] leading-[75px]">
              Change <br className="sm:block hidden" />{" "}
              <span className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-600">The Way</span>{" "}
            </h1>
            <div className="ss:flex hidden md:mr-4 mr-0">
              {/* <GetStarted /> */}
            </div>
          </div>

          <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-gray-500 ss:leading-[100.8px] leading-[75px] w-full">
            You Money
          </h1>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            India’s first digital banking experience
            that helps you save better,
            shop smarter, & borrow easily.
          </p>
        </div>
        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
          <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

          {/* gradient start */}
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
          <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          {/* gradient end */}
        </div>

        <div className={`ss:hidden ${styles.flexCenter}`}>
          {/* <GetStarted /> */}
        </div>
      </section>
      <Business />
      <Billing />
      <CardDeal />
      
      <div className='bg-black'>
        <Footer></Footer>
      </div>

    </>
  );
};

export default Home;
