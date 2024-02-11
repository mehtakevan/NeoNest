const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const crypto = require('crypto');
const { json } = require("express");
const { use } = require("../routes/userRoutes");



const createAccount = asyncHandler(async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
        const prefix = "NN"
        const length = 10
        async function hashFunction(data) {
            const hash = crypto.createHash('sha256');
            hash.update(data);
            return hash.digest('hex');
          }
      const timestamp = Date.now().toString();
      const randomNumber = Math.floor(Math.random() * 10000); // You can adjust the range as needed
      const dataToHash = `${timestamp}${randomNumber}`;
      const checksum = await hashFunction(dataToHash); // Replace hashFunction with an actual hashing function
      const accountNumber =`${prefix}${timestamp}${randomNumber}${checksum}`.slice(0, length);
      console.log(accountNumber);
        const acct = await Account.create({
           accountholder : user._id,
           accountNumber : accountNumber,
        });
        if(acct){
            console.log(acct);
            return acct;
        }
        else{
            throw new Error("error");
        }

    }
  } catch (error){
    console.error("error in accnt creation ",error);
    throw new Error(error);
  }
});

const sendMoney = asyncHandler(async(req,res)=>{
  const data = req.body;
  const user = req.session.user;
  console.log(user);
  data.sender = user._id;
  try{
  const response = await transfer(data);
  res.status(200).send("Transaction Completed");
  }catch(error){
    console.log(error);
    res.status(500).send(error.toString());
  }
})

const getLoan = asyncHandler(async(req,res)=>{
  const user = req.session.user;
  const amount = req.body.amount;

  const accnt = await Account.findOne({accountholder : user._id});
  console.log(accnt);
  if(accnt){
    if(accnt.totalamount >= amount/10){
      accnt.totalamount += amount;
      accnt.loanamount += amount;
      await accnt.save();
      res.status(200).send("Loan Approved")
    }
    else{
      res.status(500).send(`Insufficient minimum balance needed for ${amount} loan`);
    }
  }else{
    res.status(500).send("Account Not found");
  }

})

const transfer = asyncHandler(async(body)=>{
  const {email, accountNumber,amount,note,sender} = body;

  if(!email && !accountNumber){
    throw new Error ("Please enter email or accountNumber");
  }
  else{
    if(email){
      const user = await User.findOne({email});
      if(user){
        const id = user._id;
        const rec_accnt = await Account.findOne({accountholder:id});
        const sen_accnt = await Account.findOne({accountholder:sender});
        if(sen_accnt.totalamount >= amount){
          rec_accnt.totalamount += amount;
          sen_accnt.totalamount -= amount;
          await rec_accnt.save();
          await sen_accnt.save();
        }else{
          throw new Error("Insufficient balance");
        }
        const tran = await Transaction.create({
          sender : sender,
          receiver : id,
          amount : amount,
          note : note,
        });
        if(tran){
          return tran;
        }
        else{
          throw new Error ("Transaction failed");
        }
      }
      else{
        throw new Error ("User Not found");
      }
    }
    else{
      const user = await Account.findOne({accountNumber});
      if(user){
        const id = user.accountholder;
        const rec_accnt = user;
        const sen_accnt = await Account.findOne({accountholder:sender});
        if(sen_accnt.totalamount >= amount){
          rec_accnt.totalamount += amount;
          sen_accnt.totalamount -= amount;
          await rec_accnt.save();
          await sen_accnt.save();
        }else{
          throw new Error("Insufficient balance");
        }
        const tran = await Transaction.create({
          sender : sender,
          receiver : id,
          amount : amount,
          note : note,
        });
        if(tran){
          return tran;
        }
        else{
          throw new Error ("Transaction failed");
        }
      }
      else{
        throw new Error ("User Not found");
      }
    }
  }
});

  const getData = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    console.log("Hey from getData");
    console.log(email);
    const user = await User.findOne({ email: email });
    console.log(user);
    const accnt = await Account.findOne({accountholder : user._id});
    console.log(accnt);

    if(accnt){
      res.json({
        totalamount : accnt.totalamount,
        totalloan : accnt.loanamount,
        totalfd : accnt.fixeddeposit,
        totalstocks : 0,
        name:user.userName
      });
    }else{
      res.status(500).send("Error Occured");
    }

  });


module.exports = {createAccount,sendMoney,getLoan,getData};