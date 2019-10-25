const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liverExamSchema = new Schema({
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

const liverExam = mongoose.model("LiverExams", liverExamSchema);
module.exports = liverExam;