const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
    name:{
        type: String,
        reuired:true
    },
    email:{
        type: String,
        reuired:true
    },
    address:{
        type: String,
        reuired:true
    },
    phone:{
        type: Number ,
        reuired:true
    },
   

    
    
    
})






    
const Volunteer = mongoose.model('VOLUNTEER', volunteerSchema);
module.exports = Volunteer;