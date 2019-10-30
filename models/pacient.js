const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pacientSchema = new Schema({

  nome:  String,
  idade: Number,
  convenio: String,
  email: String,
  telefone: String,
  exams:[{ type: Schema.Types.ObjectId, ref: 'allexams' }]


  
}, {
  timestamps: true
});

const Pacient = mongoose.model("pacients", pacientSchema);
module.exports = Pacient;