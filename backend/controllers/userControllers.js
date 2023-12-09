const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const nodemailer = require("nodemailer");
const { random } = require("colors");
const randomstring = require("randomstring");

const otpmap = new Map();

const sendmail = (async(email) =>{

  const otp = randomstring.generate({
    length: 6,
    charset: 'numeric',
  });

  otpmap.set(email,otp);

  var transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
    
    user: 'sdpneobank12@gmail.com',
    pass: 'zmxa waxl giha rjeb'
    }

    
    });
    var mailOptions = {

      from: 'sdpneobank12@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: `kindly enter the otp : ${otp}`
      };

      transporter.sendMail(mailOptions, function(error, info){

        if (error) {
        
          
        console.log(error);
        res.status(500);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200)
        }
        
        });
})

const registerUser = asyncHandler(async (req, res) => {
    const { username, age,email, password, contact,panNumber } = req.body;
  
    if (!username || !email || !password || !panNumber) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      username,
      email,
      password,
      panNumber,
      age,
      contact
    });
  
    if (user) {
      const sendmail_res = await sendmail(user.email);
      if(sendmail_res.status === 200){
      res.status(201).json({
       _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
    else{
      res.status(500);
    }
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });
  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  
  module.exports = {  registerUser, authUser };