const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pacientSchema = new Schema({
  sex: String,
  name: String,
  age: Number,
  phone: Number,
  healthPlan: String,
  email: String,
  weight: Number,
  height: Number,
  bodySurface: Number,
  exams:{ type: Schema.Types.ObjectId, ref: 'allexams' }


  
}, {
  timestamps: true
});

const Pacient = mongoose.model("pacients", pacientSchema);
module.exports = Pacient;