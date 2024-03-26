const mongoose = require("mongoose");
const { number } = require("yup");

const portfolioSchema = mongoose.Schema({
    portfolioHolder: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    stockName: {type: String},
    buyPrice: {type: Number , min: 0 , default: 0},
    quantity: {type: Number, min: 0 , default: 0},
    sellPrice: {type: Number, min: 0 , default: 0},
    profitLoss: {type: Number, default: 0},
});
const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;