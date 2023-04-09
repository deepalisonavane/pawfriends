const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
require("../db/conn");
const User = require("../models/userschema");

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
    res.status(201).json({ message: "ser registered suceessfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please filed data" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken()
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

module.exports = router;
