const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pacientSchema = new Schema({
  dataDeNasc: Date,
  nome:String,
  idade:Number,
  telefone:Number,
  email:String,
  convenio: String,
  exams:[{ type: Schema.Types.ObjectId, ref: 'allexams' }]


  
}, {
  timestamps: true
});

const Pacient = mongoose.model("pacients", pacientSchema);
module.exports = Pacient;