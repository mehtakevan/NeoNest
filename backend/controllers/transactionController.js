const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const { json } = require("express");
const { use } = require("../routes/userRoutes");

const getTranData = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    console.log("Hey from getTranData");
    console.log(email);
    const user = await User.findOne({ email: email });
    console.log(user);

    const sender_transdetails = await Transaction.find({sender:user._id} || {receiver:user._id});
    // const receiver_transdetail = await Transaction.find({receiver:user._id});

    console.log("Sender's infor");
    console.log(sender_transdetails);

    // console.log("receiver's infor")
    // console.log(receiver_transdetail);

    res.json({
        sender : sender_transdetails,
        // receiver : receiver_transdetail,
    })
});

module.exports = { getTranData};