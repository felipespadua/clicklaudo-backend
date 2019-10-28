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
    tamanhoCisto: Number,
    pacient:{type: Schema.Types.ObjectId},
    pacientName:String,
}, {timestamps: true});

const LiverExam = mongoose.model("liverExams", liverExamSchema);
module.exports = LiverExam;