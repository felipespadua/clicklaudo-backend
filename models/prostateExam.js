const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prostateExamSchema = new Schema({
    date: Date,
    doctor: String,
    doctorRequester: String,
    clinical: String,
    homogenio: Boolean,
    dimensoes: Boolean,
    esteatotico: Boolean,
    cisto: Boolean,
    tamanhoCisto: Number

}, {timestamps: true});

const prostateExam = mongoose.model("prostateExams", prostateExamSchema);
module.exports = prostateExam;