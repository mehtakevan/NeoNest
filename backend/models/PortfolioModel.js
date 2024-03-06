const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema({
    portfolioHolder: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    stockName: {type: String},
    buyPrice: {type: mongoose.Schema.Types.Decimal128 , min: 0 , default: 0},
    quantity: {type: Number, min: 0 , default: 0},
    sellPrice: {type: mongoose.Schema.Types.Decimal128, min: 0 , default: 0},
    profitLoss: {type: mongoose.Schema.Types.Decimal128, default: 0},
});
const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;