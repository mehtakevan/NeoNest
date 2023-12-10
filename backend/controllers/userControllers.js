const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const nodemailer = require("nodemailer");
const { random } = require("colors");
const randomstring = require("randomstring");
const session = require('express-session');
const { use } = require("../routes/userRoutes");

const otpmap = new Map();

const verifyotp = asyncHandler(async(req,res) =>{
  const received_otp = req.body.otp;
  const email = req.session.cusEmail;
  const required_otp = otpmap.get(email);

  console.log(email);
  console.log(received_otp);
  console.log(required_otp);


  if(received_otp === required_otp){
    const user = await User.findOneAndUpdate(
      { email : email },
      { $set: { ['isVerified'] : true } },
      { new: true });
    
    console.log(user);
    res.status(201).send("User verified");
  }
  else
    res.status(500).send("enter valid otp");
})

const sendmail = asyncHandler(async(email) =>{

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
      try{
        const info = await transporter.sendMail(mailOptions)
        console.log(info);
        return info;
      }catch(error){
        console.error("error in sendmail",error);
        throw new Error("Error");
      }
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
      try {
        const sendmail_res = await sendmail(user.email);
        req.session.cusEmail = user.email;
        if (sendmail_res && sendmail_res.response.includes('OK')) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          });
        } else {
          console.error('Error sending email:', error)
          res.status(500).send('Error sending email');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
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
      if(user.isVerified){
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          
          token: generateToken(user._id),
        })
      }
      else{
        try{
          const sendmail_res = await sendmail(user.email);
          req.session.cusEmail = user.email;
          if (sendmail_res && sendmail_res.response.includes('OK')) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              token: generateToken(user._id),
            });
          } else {
            console.error('Error sending email:', error)
            res.status(500).send('Error sending email');
          }
        }catch(error){
          res.status(500).send(error);
        }
      }
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  
  module.exports = {  registerUser, authUser, verifyotp };