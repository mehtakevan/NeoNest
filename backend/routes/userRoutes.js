const express = require("express");
const {
  registerUser,
  authUser,
  verifyotp,
  forgotpassword,
  setpassword,
  addAadhar,
  aadharSignUp,
  getUserData
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/otp", verifyotp);
router.post("/forgotpassword",forgotpassword);
router.post("/setpassword",setpassword);
router.post("/addaadhar",addAadhar);
router.post("/aadharsignup",aadharSignUp);
router.post("/getuserdata",getUserData);

module.exports = router;