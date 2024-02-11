const express = require("express");
const{getTranData} = require("../controllers/transactionController.js");


const router = express.Router();

router.post('/gettrandata',getTranData);

module.exports = router;