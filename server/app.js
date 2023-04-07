const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require("express");
const app = express();
dotenv.config({path:'./config.env'});
require('./db/conn')
app.use(express.json());

app.use( require("./routes/auth"));
const User =require('./models/userschema');
const PORT = process.env.PORT;
const middleware = (req,res,next)=>{
    console.log("middleware");
    next();
}


app.get('/', (req,res)=>{
    res.send("hellloo");

});

app.get('/signin', (req,res)=>{
    res.send("signinn");

});

app.get('/signup', (req,res)=>{
    res.send("signup");

});
app.listen(PORT,()=>{
console.log(`server running on ${PORT}`);
})

