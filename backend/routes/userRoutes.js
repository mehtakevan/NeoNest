const express = require("express");
const {
  registerUser,
  authUser,
  verifyotp,
  forgotpassword,
  setpassword
} = require("../controllers/userControllers");
const{sendMoney, getLoan} = require("../controllers/accountController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/otp", verifyotp);
router.post("/forgotpassword",forgotpassword);
router.post("/setpassword",setpassword);
router.post("/sendMoney",sendMoney);
router.post("/loan",getLoan)


module.exports = router;