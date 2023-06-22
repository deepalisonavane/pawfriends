const mongoose = require("mongoose");

const volunteerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age:{
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    reuired: true,
  },
  phone: {
    type: Number,
    reuired: true,
  },

});

const Volunteer = mongoose.model("VOLUNTEER", volunteerSchema);
module.exports = Volunteer;
