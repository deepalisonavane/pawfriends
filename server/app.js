const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require("express");
const app = express();
dotenv.config({path:'./config.env'});
require('./db/conn')
app.use(express.json());

app.use( require("./routes/auth"));
const User = require('./models/userschema');
const Volunteer = require('./models/volunteer.js')
const Adoption = require('./models/adoption')

const PORT = process.env.PORT;
const middleware = (req,res,next)=>{
    console.log("middleware");
    next();
}




app.get('/signin', (req,res)=>{
    res.send("signinn");

});

app.get('/signup', (req,res)=>{
    res.send("signup");


});

app.get('/volunteer', (req,res)=>{
    res.send("volunteer");

});

app.get('/adoption', (req,res)=>{
    res.send("adoption");

});
app.listen(PORT,()=>{
console.log(`server running on ${PORT}`);
})

