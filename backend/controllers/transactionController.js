const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const { json } = require("express");
const { use } = require("../routes/userRoutes");

const getTranData = asyncHandler(async(req,res)=>{
    try{
    const email = req.body.email;
    console.log("Hey from getTranData");
    console.log(email);
    const user = await User.findOne({ email: email });
    console.log(user);

    let transdetails = await Transaction.find({sender:user._id} || {receiver:user._id});

    let userdetails = [];
    for (let element of transdetails) {
        let e1 = element.toObject();
        let userToFindId;
        if (element.sender.toString() === user._id.toString()) {
            userToFindId = element.receiver;
        } else {
            userToFindId = element.sender;
        }

        const user1 = await User.findOne({ _id: userToFindId });
        if (user1) {
            e1.name = user1.userName;
        }
        userdetails.push(e1);
    }

console.log("Sender's info");
console.log(userdetails);

    // console.log("receiver's infor")
    // console.log(receiver_transdetail);

    res.json({
        sender : userdetails,
        // receiver : receiver_transdetail,
    })
}catch(error){
    console.log(error);
}
});

module.exports = { getTranData};