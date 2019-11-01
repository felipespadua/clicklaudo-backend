const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liverExamSchema = new Schema({
    data: Date,
    medico: String,
    medicoSolicitante: String,
        dimensao: String,
      homogeneo: Boolean,
    
      esteatotico: Boolean,
      hepatopiaCronica: Boolean,

      ciscoSimples: Boolean,
      cistoSimplesMM: Number,
      ciscoSimplesSit: String,

      variosCiscos: Boolean,
      variosCiscosMM: Number,
      variosCiscosSit: String,
        noduloSolido: Boolean,
      noduloSolidoTipo: String,
      noduloSolidoContorno: String,
      noduloSolidoHMM: Number,
      noduloSolidoVMM: Number,
      noduloSolidoSit: String,
      calcificacaoGrosseira: Boolean,
      calcificacaoGrosseiraMM: Number,
      calcificacaoGrosseiraSit: String,
    pacient:{type: Schema.Types.ObjectId},
   
}, {timestamps: true});

const LiverExam = mongoose.model("liverExams", liverExamSchema);
module.exports = LiverExam;