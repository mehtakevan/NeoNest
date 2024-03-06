const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const dotenv = require("dotenv");
const { json } = require("express");
const { use } = require("../routes/userRoutes");
dotenv.config({path : '../.env'})
const Razorpay = require('razorpay');

const razorpay_secret = process.env.RAZOR_PAY_SECRET;
var instance = new Razorpay({ key_id: 'rzp_test_4jBEIDzdbYVvAZ', key_secret: razorpay_secret })

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
    userdetails.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });    
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

const createOrder = asyncHandler(async(req,res)=>{
    try{
        let amount = req.body.amount;
        amount = amount*100;

        var options = {
            amount: amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };

        const order = await instance.orders.create(options);

        if(order){
            console.log(order);
            res.json({
                order : order
            });
        }else{
            res.status(500).send("Error");
        }
    }catch(error){
        res.status(500).send(error);
    }
});

const Addfund = asyncHandler(async(req,res)=>{
    try{
        let amount = req.body.amount;
        amount = parseInt(amount);
        console.log(typeof(amount));
        const email = req.body.email;
        const user = await User.findOne({email:email});

        if(user){
            const accnt = await Account.findOne({accountholder:user._id});
            accnt.totalamount += amount;
            await accnt.save();
            console.log(accnt);
            const tran = await Transaction.create({
                receiver : user._id,
                amount : amount,
                note : "Funds Added",
            });
            console.log(tran);
            res.status(201).send("transaction successful");
        }else{
            res.status(500).send("Error");
        }

    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = { getTranData,createOrder,Addfund};