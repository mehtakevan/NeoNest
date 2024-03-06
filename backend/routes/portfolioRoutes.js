const express = require("express");
const{buyStock , sellStock , getPrice } = require("../controllers/portfolioController");
const { route } = require("./userRoutes");


const router = express.Router();

router.post("/buystock",buyStock);
router.post("/sellstock",sellStock);
router.post("/getprice",getPrice);


module.exports = router;