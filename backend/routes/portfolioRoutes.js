const express = require("express");
const{buyStock , sellStock , getPrice, getPortfolio } = require("../controllers/portfolioController");
const { route } = require("./userRoutes");


const router = express.Router();

router.post("/buystock",buyStock);
router.post("/sellstock",sellStock);
router.post("/getprice",getPrice);
router.post("/getportfolio",getPortfolio);


module.exports = router;