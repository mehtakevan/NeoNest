import React, { useState } from 'react';
import './FixedDeposit.css'; 
import Navbar from '../../components/Navbar/Navbar';

const FixedDeposit = () => {
  const [amount, setAmount] = useState('');
  const [days, setDays] = useState('');
  const [maturityAmount, setMaturityAmount] = useState(null);

  const calculateMaturityAmount = () => {
    const interestRate = 0.07; 
    const interest = amount * interestRate * (days / 365);
    const maturity = parseFloat(amount) + interest;
    setMaturityAmount(maturity.toFixed(2));
  };

  return (
    <div className='fdpage'>
    <Navbar />
    <div className="fixed-deposit-container">
      <div className="fixed-deposit-form">
        <h1>Enter Your FixedDeposit</h1>
        <div>
          <label>Enter Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label>Enter Number of Days:</label>
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)} />
        </div>
        <button onClick={calculateMaturityAmount}>Calculate</button>
        {maturityAmount && (
          <div>
            <h2>Maturity Amount:</h2>
            <p>{maturityAmount}</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default FixedDeposit;
