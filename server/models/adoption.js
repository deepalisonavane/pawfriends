const mongoose = require('mongoose');

const adoptionSchema = mongoose.Schema({
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
   type:{
    adoption: {type: String, possibleValues: ['rescue','steralization','adoption']}

   }

    
    
    
})






    
const Adoption = mongoose.model('ADOPTION', adoptionSchema);
module.exports = Adoption;