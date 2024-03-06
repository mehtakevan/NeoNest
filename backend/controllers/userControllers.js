const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Aadhaar = require("../models/aadharModel");
const generateToken = require("../config/generateToken");
const nodemailer = require("nodemailer");
const { random } = require("colors");
const randomstring = require("randomstring");
const session = require("express-session");
const { use } = require("../routes/userRoutes");
const { createAccount } = require("../controllers/accountController");

const otpmap = new Map();

const verifyotp = asyncHandler(async (req, res) => {
  const received_otp = req.body.otp;

  if(typeof(received_otp) === String){
    received_otp = parseInt(received_otp);
  }

  const email = req.body.email;
  const required_otp = otpmap.get(email);

  console.log(email);
  console.log(received_otp);
  console.log(required_otp);

  if (received_otp === required_otp) {
    // const user = await User.findOneAndUpdate(
    //   { email: email },
    //   { $set: { ["isVerified"]: true } },
    //   { new: true }
    // );
    try{
    // const found = await createAccount(email);
    // console.log("--------------------------------------------------------------------------");
    // console.log(found);
    // console.log("--------------------------------------------------------------------------");
    // console.log(user);
    res.status(201).send("User verified");
    }catch(error){
      res.status(500).send(error);
    }
  } else res.status(500).send("enter valid otp");
});

const sendmail = asyncHandler(async (email, flag) => {
  if (flag === 0) {
    const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    otpmap.set(email, otp);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sdpneobank12@gmail.com",
        pass: "zmxa waxl giha rjeb",
      },
    });
    var mailOptions = {
      from: "sdpneobank12@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: `kindly enter the otp : ${otp}`,
    };
  }
  else{
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sdpneobank12@gmail.com",
        pass: "zmxa waxl giha rjeb",
      },
    });
    var mailOptions = {
      from: "sdpneobank12@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: `Click on this link to access the API: https://localhost:3000/setpassword/?email=${email}`,
    };
  }
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    return info;
  } catch (error) {
    console.error("error in sendmail", error);
    throw new Error("Error");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { userName, age, email, password, contact, panNumber } = req.body;

  if (!userName || !email || !password || !panNumber) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    userName,
    email,
    password,
    panNumber,
    age,
    contact,
    isVerified:true,
  });

  if (user) {
    try {
      // const sendmail_res = await sendmail(user.email,0);
      // req.session.cusEmail = user.email;
      // if (sendmail_res && sendmail_res.response.includes("OK")) {
      //   res.status(201).json({
      //     _id: user._id,
      //     name: user.name,
      //     email: user.email,
      //     token: generateToken(user._id),
      //   });
      const found = await createAccount(email);
      console.log(found);
      res.status(201).send("Account Created");
      }
     catch (error) {
      console.error("Error creating email:", error);
      res.status(500).send("Error creating account");
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
    console.log(user);
    if (user.isVerified) {
      req.session.user = user;
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      try {
        const sendmail_res = await sendmail(user.email,0);
        req.session.cusEmail = user.email;
        if (sendmail_res && sendmail_res.response.includes("OK")) {
          req.session.user = user;
          res.status(201).json({ msg : "Mail sent for verification"});
        } else {
          console.error("Error sending email:", error);
          res.status(500).send("Error sending email");
        }
      } catch (error) {
        res.status(500).json({msg : error});
      }
    }
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const forgotpassword = asyncHandler(async (req, res) => {
  const email = req.body.email;
  req.session.email = req.body.email;
  const user = await User.findOne({email});
  if(user){
    const sendmail_res = sendmail(email, 1);
    res.status(201).send("Mail send");
  }
  else{
    res.status(404).send("User Not found");
  }
});

const setpassword = asyncHandler(async(req,res)=>{
  console.log("HI")
  const password = req.body.pass;
  const cnf_password = req.body.confirmpassword;
  console.log(password)
  console.log(cnf_password)

  if(password != cnf_password){
    res.status(500).send("Password and cnf_Password does not match");
  }
  else{
    const email = req.body.email;
    console.log(email)
    try{
    const user = await User.findOne({email:email});
    if(user){
      user.password = password;
      await user.save();
      res.status(201).send("Password reset done");
    }
  }catch(error){
    console.log(error);
    throw new Error(error);
  }
  }

});

const addAadhar = asyncHandler(async(req,res)=>{
  const {name, gender, age, aadharNumber,email,panNumber,contact, } = req.body;

  const aadhar = await Aadhaar.create({
    name,
    gender,
    age,
    aadharNumber,
    email,
    panNumber,
    contact
  });

  console.log(aadhar);
  if(aadhar){
    res.status(201).send("done");
  }else{
    res.status(500).send("error");
  }
});

const aadharSignUp = asyncHandler(async(req,res)=>{
  const aadharNumber = req.body.aadhar;
  
  try{
  const aadharDetails = await Aadhaar.findOne({aadharNumber : aadharNumber});
  
  if(aadharDetails){
    console.log(aadharDetails);
    const sendmail_res = await sendmail(aadharDetails.email,0);
    if (sendmail_res && sendmail_res.response.includes("OK")) {
      res.status(201).json({
        aadhar : aadharDetails
      });
    } else {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    }
  }
  }catch(error){
    throw new Error(error);
  }
  
});

const getUserData = asyncHandler(async(req,res)=>{
  const email = req.body.email;

  const data = await Aadhaar.findOne({email : email});
  if(data){
    res.status(200).json({
      data : data
    });
  }else{
    res.status(500).send("Error");
  }
});


module.exports = { registerUser, authUser, verifyotp,forgotpassword,setpassword,addAadhar ,aadharSignUp,getUserData};
