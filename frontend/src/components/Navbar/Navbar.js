import React, { useState } from 'react';
import './Navbar.css';  // Import your CSS file for additional styling

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <header className="navbar">
      
      <nav className={showNavLinks ? 'nav-links active' : 'nav-links'}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/transfer">Transfer</a></li>
          <li><a href="/addfund">Add fund</a></li>
          <li><a href="/fixedDeposit">FixedDeposit</a></li>
          <li><a href="#">Stocks</a></li>
        </ul>
      </nav>
      <div className="hamburger-menu" onClick={toggleNavLinks}>
        <div className={showNavLinks ? 'line line1 active' : 'line line1'}></div>
        <div className={showNavLinks ? 'line line2 active' : 'line line2'}></div>
        <div className={showNavLinks ? 'line line3 active' : 'line line3'}></div>
      </div>
     
    </header>
  );
};

export default Navbar;
