const express = require("express");
const {
  registerUser,
  authUser,
  verifyotp
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/otp", verifyotp);

module.exports = router;