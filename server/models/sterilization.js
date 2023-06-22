const mongoose = require("mongoose");

const sterilizationSchema = mongoose.Schema({
  name: {
    type: String,
    reuired: true,
  },
  email: {
    type: String,
    reuired: true,
  },

  phone: {
    type: Number,
    reuired: true,
  },
  service: {
      type: String,

  },
  animal:{
    type :String,
  }
});

const Sterilization = mongoose.model("STERILIZATION", sterilizationSchema);
module.exports = Sterilization;
