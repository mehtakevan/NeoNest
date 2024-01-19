// Home.js
import React from 'react';
import './Home.css';
import GoogleFontLoader from 'react-google-font-loader';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <GoogleFontLoader fonts={[{ font: 'Playfair Display', weights: [600, 700] }]}/>
      <div className="home-container">
        <div className="content">
          {/* Updated button container with new class */}
          <div className="button-container">
            {/* Rounded buttons for login and signup */}
            <Link to="/login" className="rounded-button login">
              Log In
            </Link>
            <Link to="/signup" className="rounded-button signup">
              SignUp
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
