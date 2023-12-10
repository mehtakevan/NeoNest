const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    accountholder: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    accountnumber: {type: Number, unique:true },
    totalamount: {type: Number , min: 0 , default: 0},
    fixeddeposit: {type: Number, min: 0 , default: 0},
    loanamount: {type: Number, min: 0 , default: 0},
   

});
const Account = mongoose.model("Account", accountSchema);
module.exports = Account;