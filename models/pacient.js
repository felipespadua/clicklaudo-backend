const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pacientSchema = new Schema({
  sex: String,
  Name: String,
  Age: Number,
  Phone: Number,
  healthPlan: String,
  Email: String,
  Weight: Number,
  Height: Number,
  BodySurface: Number
  


  
}, {
  timestamps: true
});

const Pacient = mongoose.model("Pacient", pacientSchema);
module.exports = Pacient;