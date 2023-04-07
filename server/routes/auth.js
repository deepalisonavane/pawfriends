const express = require('express');
const router = express.Router();
require("../db/conn")
const User = require("../models/userschema");


router.get('/', (req,res)=>{
  res.send("authhh")
});

router.post('/register', async(req,res)=>{

 const { name,email,phone,password,cpassword} = req.body
  
 if (!name || !email ||!phone ||!password ||!cpassword ){
  return res.status(422).json({error:"please fill all details"})

   }
   try {
     const userExist= await User.findOne({email:email})
   
     if(userExist){
  return res.status(422).json({error:"email already exist"})
     }
     const user = new User({name, email,phone,password,cpassword})
      const registered = await user.save();
      if(registered){
        res.status(201).json({message:"ser registered suceessfully"})

      }else{console.log("failed")}
    }catch(err){console.log(err);}

  });















module.exports = router;