const express = require("express");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("../db/conn");
const User = require("../models/userschema");
const Volunteer = require("../models/volunteer");
const Adoption = require("../models/adoption");
const Service = require("../models/services")

router.get("/", (req, res) => {
  res.send("authhh");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "please fill all details" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    }
    const user = new User({ name, email, phone, password, cpassword });
    const registered = await user.save();
    res.status(201).json({ message: "user registered suceessfully" });
    console.log(registered);
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please filed data" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "user error" });
      } else {
        res.json({ message: "user sign in sccessfully" });
      }
    } else {
      res.json({ message: "invaild credential" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/volunteer", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  try {
    const volunteer = new Volunteer({
      name,
      email,
      phone,
      password,
      cpassword,
    });
    const voldata = await volunteer.save();

    // const donationrec = await food.save();
    // res.status(201).render("instruction");
    res.status(201).json({ message: "user registered suceessfully" });
    console.log(voldata);
  } catch (error) {
    res.status(400).send("error");
  }
});

router.post("/service", async (req,res)=>{
  try {
    const service = new Service({servicer } = req.body)
    const served = await service.save();
    res.status(201).json({ message: "services delected" });
    console.log(served);

  } catch (error) {
    console.log(error)
  }
});-


router.post("/adoption", async (req, res) => {
  const { name, email, phone, address, type } = req.body;
  try {
    const adoption = new Adoption({ name, email, phone, address, type });
    console.log(adoption);
    const adopt = await adoption.save();
    res.status(201).json({ message: "user registered suceessfully" });
    console.log(adopt);
  } catch (error) {
    res.status(400).send("error");
  }
});

const PaymentDetailsSchema = mongoose.Schema({
  razorpayDetails: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  success: Boolean,
});

const PaymentDetails = mongoose.model('PaymentDetail', PaymentDetailsSchema);

router.post('/orders', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
      key_secret: process.env.RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
    });

    const options = {
      amount: 50000,
      currency: 'INR',
      receipt: 'receipt_order_74394',
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send('Some error occured');

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/success', async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shasum = crypto.createHmac('sha256', '<YOUR RAZORPAY SECRET>');
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: 'Transaction not legit!' });

    const newPayment = PaymentDetails({
      razorpayDetails: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
      success: true,
    });

    await newPayment.save();

    res.json({
      msg: 'success',
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});





module.exports = router;
