const express = require("express");
const{sendMoney, getLoan,getData,getFixedDeposit} = require("../controllers/accountController");
const { route } = require("./userRoutes");


const router = express.Router();

router.route("/getData").post(getData);
router.post("/sendmoney",sendMoney);
router.post("/getloan",getLoan);
router.post("/getfixeddeposit",getFixedDeposit);


module.exports = router;