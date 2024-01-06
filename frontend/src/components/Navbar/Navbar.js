import React, { useState } from 'react';
import './Navbar.css';  // Import your CSS file for additional styling
import company_logo from '../../assets/neo-nest.png';

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <header className="navbar">
      <div className="logo-container">
        <img src={company_logo} alt="Company Logo" className='logo img-fluid' />
      </div>
      <nav className={showNavLinks ? 'nav-links active' : 'nav-links'}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Transfer</a></li>
          <li><a href="#">Stocks</a></li>
        </ul>
      </nav>
      <div className="hamburger-menu" onClick={toggleNavLinks}>
        <div className={showNavLinks ? 'line line1 active' : 'line line1'}></div>
        <div className={showNavLinks ? 'line line2 active' : 'line line2'}></div>
        <div className={showNavLinks ? 'line line3 active' : 'line line3'}></div>
      </div>
      <div className="auth-links">
        <a href="/Login">Login</a>
        <a href="/SignUp">Signup</a>
      </div>
    </header>
  );
};

export default Navbar;
