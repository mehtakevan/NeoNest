// Card.js
import React from 'react';
import PropTypes from 'prop-types';

const Cardlayout = ({ title, amount, icon }) => {
  return (
    <div style={styles.card}>
      {icon}
     <div style={styles.content}> 
     <h2 className='cardTitle'>{title}</h2>
   <br/>
      <p>Amount: {amount}₹</p>

      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '9px',
    padding: '16px',
    margin: '16px',
    boxShadow: '1px 8px 16px rgba(0, 255, 0, 0.2)',
    
    // '1px 8px 16px rgba(0, 0, 0, 0.6)',
     background: 'white'
    // background: 'rgb(0, 7, 61)',
    // color: 'white'
  
  },
  
  content: {
    fontSize: '20px',
    fontFamily: "Roboto",
    fontWeight: '700',
    fontStyle: 'normal' 
    //  fontWeight: 'bold'
  
  }
  
};


Cardlayout.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired, // Ensure icon is a React element
};

export default Cardlayout;
