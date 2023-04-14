const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken")
require("../db/conn");
const User = require("../models/userschema");
const Volunteer = require("../models/volunteer");
const Adoption = require("../models/adoption");



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
    console.log(registered)
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
      res.cookie("jwtoken", token,{
        expires :new Date(Date.now()+25892000000),
        httpOnly:true
      })
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

router.post("/volunteer",async(req,res)=>{
  const { name, email, phone, password, cpassword } = req.body;
  try {
    const volunteer = new Volunteer({ name, email, phone, password, cpassword });
    const voldata = await volunteer.save();
   
      // const donationrec = await food.save();
      // res.status(201).render("instruction");
      res.status(201).json({ message: "user registered suceessfully" });
      console.log(voldata);
} catch (error) {
  res.status(400).send("error");  
}

})

router.post("/adoption",async(req,res)=>{
  const { name, email, phone, address,type,  } = req.body;
  try {
    const adoption = new Adoption({ name, email, phone, address, type });
    console.log(adoption)
    const adopt = await adoption.save();
   
      // const donationrec = await food.save();
      // res.status(201).render("instruction");
      res.status(201).json({ message: "user registered suceessfully" });
      console.log(adopt);
} catch (error) {
  res.status(400).send("error");  
}

})


module.exports = router;
