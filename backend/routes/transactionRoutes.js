const express = require("express");
const{getTranData, createOrder, Addfund} = require("../controllers/transactionController.js");


const router = express.Router();

router.post('/gettrandata',getTranData);
router.post('/createorder',createOrder);
router.post('/addfund',Addfund);


module.exports = router;