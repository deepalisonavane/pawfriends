const mongoose = require('mongoose');
const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{

    console.log("CONNECTION SUCCESS")
}).catch(()=>{
    console.log("connection failed")
})

