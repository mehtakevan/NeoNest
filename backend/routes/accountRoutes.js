const express = require("express");
const{sendMoney, getLoan,getData} = require("../controllers/accountController");


const router = express.Router();

router.route("/getData").post(getData);
router.post("/sendmoney",sendMoney);


module.exports = router;