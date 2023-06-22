const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");
app.use(express.json());

//payment gateway
const router = express.Router();

const Razorpay = require('razorpay');
const crypto = require('crypto');

app.use(require("./routes/auth"));
const User = require("./models/userschema");
const Volunteer = require("./models/volunteer.js");
const Adoption = require("./models/adoption");
const Service = require("./models/services");
const Sterilization = require("./models/sterilization")
const Contact = require("./models/contact")

const PORT = process.env.PORT;
const middleware = (req, res, next) => {
  console.log("middleware");
  next();
};
app.get("/signin", (req, res) => {
  res.send("signinn");
});

app.get("/signup", (req, res) => {
  res.send("signup");
});

app.get("/volunteer", (req, res) => {
  res.send("volunteer");
});

app.get("/adoption", (req, res) => {
  res.send("adoption");
});

app.get("/service", (req, res) => {
  res.send("service");
});

app.get("/sterilization", (req, res) => {
  res.send("sterilization");
});

app.get("/contact", (req, res) => {
  res.send("contact");
});

app.get('/payment', require('./routes/auth'));



//payment

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
