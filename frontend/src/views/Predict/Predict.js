import React, { useState } from 'react';
import './Predict.css';
import StockNavbar from '../../components/StockNavbar/StockNavbar';
import { FaSearch } from 'react-icons/fa';

const Predict = () => {
    const [searchResult, setSearchResult] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(''); 

    const stockNames = ["Apple", "Amazon", "Microsoft", "Google", "Facebook"]; // Example array of stock names

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query); 

        const results = stockNames.filter(stock => stock.toLowerCase().includes(query.toLowerCase()));
        setSearchResult(results); 
    };

    const handlePredict = (stockName) => {
        console.log(`Predicting for ${stockName}`);
        // Add your prediction logic here
    };

    return (
        <div>
            <StockNavbar />
            <div className='predict-container'>
                <div className='left-side'>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                            value={searchQuery}
                            onChange={handleInputChange} 
                        />
                        <FaSearch className="search-icon" />
                    </div>
                    {searchQuery && (
                        <div className="search-results">
                            <h2>Search Results</h2>
                            <div className="search-results-container">
                                {searchResult.map((stock, index) => (
                                    <div key={index} className="search-result-item">
                                        <span>{stock}</span>
                                        <div className="predict-button-container">
                                            <button onClick={() => handlePredict(stock)} className="predict-button">Predict</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Predict;
