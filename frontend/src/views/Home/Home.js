// HomePage.js

import React from 'react';
import './Home.css';
import GoogleFontLoader from 'react-google-font-loader';

const Home = () => {
  return (
    <div >
      <GoogleFontLoader fonts={[{ font: 'Playfair Display', weights: [600, 700] }]}/>
     
      <div className="home-container">
      <div className="content">
         <h1>CHANGE THE WAY</h1><br/>
         <h1>YOU MONEY</h1> 
         <button className="rounded-button">Explore</button>
      </div>
      </div>
     
      <div className="home2" style={{ backgroundColor: '#2980b9' }}>
      <GoogleFontLoader fonts={[{ font: 'Josefin Sans', weights: [600, 900] }]}/>
       <h1>Get a savings account unlike any other</h1>     
       <div className='content2'>
        {/* <h1>Get a savings account unlike any other</h1>  */}
       <p>No minimum balance 🤘</p><br/>
       <p>Zero Forex on Select Plans✨</p><br/>
      <p>Withdraw from any ATM 💳</p><br/>
      <p>No hidden fees 🔎</p><br/>
      <p>Money insured up to ₹5 lakh ✅</p><br/>
      
      </div>
      </div>
     
      <div className='home3'>
  
    <h1> Hello</h1>
     
    </div>
    </div>
 
  );
};

export default Home;
