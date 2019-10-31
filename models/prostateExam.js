const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prostateExamSchema = new Schema({
    data: Date,
    clinica: String,
    medico: String,
     medicoSolicitante: String,
    size1: Number,
    size2: Number,
    size3: Number,
    contornos: String,
    residuo: Boolean,
    residuoML: Number,
    exameViaTransretal: Boolean,
    noduloPeriferica: Boolean,
    noduloPerifericaTipo: String,
    noduloSize1: Number,
    noduloSize2: Number,
    noduloSize3: Number,
    noduloLocal: String,
    biopsia: Boolean,
    fragmentos: Number,
    pacient:{type: Schema.Types.ObjectId,ref: 'pacients'},
    
}, {timestamps: true});

const ProstateExam = mongoose.model("prostateExams", prostateExamSchema);
module.exports = ProstateExam;