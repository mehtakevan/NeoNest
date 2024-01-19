const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
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

  const email = req.session.cusEmail;
  const required_otp = otpmap.get(email);

  console.log(email);
  console.log(received_otp);
  console.log(required_otp);

  if (received_otp === required_otp) {
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { ["isVerified"]: true } },
      { new: true }
    );
    try{
    const found = await createAccount(email);
    console.log("--------------------------------------------------------------------------");
    console.log(found);
    console.log("--------------------------------------------------------------------------");
    console.log(user);
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
      text: `Click on this link to access the API: https://localhost:5000/api/user/setpassword`,
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
  const { username, age, email, password, contact, panNumber } = req.body;

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
    contact,
  });

  if (user) {
    try {
      const sendmail_res = await sendmail(user.email,0);
      req.session.cusEmail = user.email;
      if (sendmail_res && sendmail_res.response.includes("OK")) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
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
          res.status(201).json({data : { msg : "Mail sent for verification"}});
        } else {
          console.error("Error sending email:", error);
          res.status(500).send("Error sending email");
        }
      } catch (error) {
        res.status(500).json({error});
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
  const {password, cnf_password} = req.body;

  if(password != cnf_password){
    res.status(500).send("Password and cnf_Password does not match");
  }
  else{
    const email = req.session.email;
    const user = await User.findOne({email:email});
    if(user){
      user.password = password;
      await user.save();
      res.status(201).send("Password reset done");
    }
  }

});

module.exports = { registerUser, authUser, verifyotp,forgotpassword,setpassword };
