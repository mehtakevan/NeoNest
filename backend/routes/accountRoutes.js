const express = require("express");
const{sendMoney, getLoan,getData} = require("../controllers/accountController");


const router = express.Router();

router.route("/getData").post(getData);



module.exports = router;