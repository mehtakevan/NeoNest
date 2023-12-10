const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const crypto = require('crypto');
const { json } = require("express");



const createAccount = asyncHandler(async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
        const prefix = "NN"
        const length = 10
        function hashFunction(data) {
            const hash = crypto.createHash('sha256');
            hash.update(data);
            return hash.digest('hex');
          }
      const timestamp = Date.now().toString();
      const randomNumber = Math.floor(Math.random() * 10000); // You can adjust the range as needed
      const dataToHash = `${timestamp}${randomNumber}`;
      const checksum = hashFunction(dataToHash); // Replace hashFunction with an actual hashing function
      const accountNumber =
        `${prefix}${timestamp}${randomNumber}${checksum}`.slice(0, length);
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
    console.error("error in accnt creation",error);
    res.status(401).send("error");
  }
});


module.exports = {createAccount};