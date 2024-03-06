import React, { useState } from 'react';
import StockNavbar from '../../components/StockNavbar/StockNavbar';
import './Portfolio.css';
import { FaSearch } from 'react-icons/fa';

const Portfolio = () => {
  const [searchResult, setSearchResult] = useState([]); // State to store search results
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  const stockNames = ["Apple", "Amazon", "Microsoft", "Google", "Facebook"]; // Example array of stock names

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the search query state as the user types

    // Filter the stock names array based on the search query
    const results = stockNames.filter(stock => stock.toLowerCase().includes(query.toLowerCase()));
    setSearchResult(results); // Set the search results in state
  };

  const handleBuySell = (stockName, action) => {
    // Implement buy/sell logic here
    console.log(`Performing ${action} for ${stockName}`);
  };

  return (
    <div>
      <StockNavbar />
      <div className="container">
        <div className="left-image"></div>
        <div className="right-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchQuery}
              onChange={handleInputChange} // Call handleInputChange function on input change
            />
            <FaSearch className="search-icon" />
          </div>
          {searchQuery && ( // Only display search results if there's a search query
            <div className="search-results">
              <h2>Search Results</h2>
              <div className="search-results-container">
                {searchResult.map((stock, index) => (
                  <div key={index} className="search-result-item">
                    <span>{stock}</span>
                    <div className="buy-sell-buttons">
                      <button onClick={() => handleBuySell(stock, 'buy')} className="buy-button">Buy</button>
                      <button onClick={() => handleBuySell(stock, 'sell')} className="sell-button">Sell</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Your table code goes here */}
          <table className="stock-table">
            <thead>
              <tr>
                <th>Stock Name</th>
                <th>Price</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                <th>Profit/Loss</th>
                <th>Buy</th>
                <th>Sell</th>
              </tr>
            </thead>
            <tbody>
              {/* Populate table rows dynamically */}
              <tr>
                <td>Stock 1</td>
                <td>100</td>
                <td>90</td>
                <td>110</td>
                <td>+10</td>
                <td><button className="buy-button">Buy</button></td>
                <td><button className="sell-button">Sell</button></td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
