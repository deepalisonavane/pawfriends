const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  fname: {
    type: String,
    reuired: true,
  },
  lname: {
    type: String,
    reuired: true,
  },
  email: {
    type: String,
  },

  phone: {
    type: Number,
  },
 
  message:{
    type :String,
  }
});

const Contact = mongoose.model("CONTACT", contactSchema);
module.exports = Contact;
