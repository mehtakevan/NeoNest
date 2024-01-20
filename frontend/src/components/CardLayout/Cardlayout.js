// Card.js
import React from 'react';
import PropTypes from 'prop-types';

const Cardlayout = ({ title, amount, description, icon }) => {
  return (
    <div style={styles.card}>
      {icon}
     <div style={styles.content}> 
     <h2>{title}</h2>
      <p>{description}</p>
      <p>Amount: ${amount}</p>
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
    boxShadow: '1px 8px 16px rgba(0, 0, 0, 0.6)',
    // background: 'rgb(105, 118, 219)'
    // background: 'rgb(0, 7, 61)',
    // color: 'white'
  
  },
  
  content: {
    fontSize: '20px',
    fontFamily: 'D M Sans',
    fontWeight: 'bold'
  
  }
  
};


Cardlayout.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired, // Ensure icon is a React element
};

export default Cardlayout;
