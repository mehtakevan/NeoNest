const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const session = require("express-session");
const cors = require('cors')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config({path : '../.env'})
connectDB();
const app = express();

app.use(cors())
app.use(session({secret: 'NeoNest', resave: true, saveUninitialized: true}))
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/account",accountRoutes);
app.use("/api/transaction",transactionRoutes);
app.use("/api/portfolio",portfolioRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);