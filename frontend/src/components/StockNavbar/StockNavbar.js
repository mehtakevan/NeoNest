import React, { useState } from 'react';
import './StockNavbar.css';  // Import your CSS file for additional styling

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);

  };

  const handleLogout = () => {

    // Clear any session-related data or tokens
    localStorage.removeItem('authToken');
    // Redirect to the login page
    window.location.href = '/';
  

  };

  return (
    <header className="navbar">
      
      <nav className={showNavLinks ? 'nav-links active' : 'nav-links'}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/predict">Predict Price</a></li>
          {/* <li><a href="#">FixedDeposit</a></li>
          <li><a href="#">Add Funds</a></li> */}
         

        </ul>
      </nav>
      <div className="hamburger-menu" onClick={toggleNavLinks}>
        <div className={showNavLinks ? 'line line1 active' : 'line line1'}></div>
        <div className={showNavLinks ? 'line line2 active' : 'line line2'}></div>
        <div className={showNavLinks ? 'line line3 active' : 'line line3'}></div>
      </div>
           {/* Logout Button/Link */}
           <div className="logout-button" onClick={handleLogout}>
        Logout
      </div>
    </header>
  );
};

export default Navbar;
