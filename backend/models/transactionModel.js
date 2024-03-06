const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    amount: {type: Number , min: 0 , default: 0},
    note: {type:String},
    date: {type : Date, default : Date.now()}
});
const transaction = mongoose.model("transaction", transactionSchema);
module.exports = transaction;