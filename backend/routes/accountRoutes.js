const express = require("express");
const{sendMoney, getLoan,getData} = require("../controllers/accountController");
const { route } = require("./userRoutes");


const router = express.Router();

router.route("/getData").post(getData);
router.post("/sendmoney",sendMoney);
router.post("/getloan",getLoan);


module.exports = router;