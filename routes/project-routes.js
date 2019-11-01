const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const GenerateReport = require("../bin/GenerateReport")
const LiverExam = require("../models/liverExam.js")
const ProstateExam = require("../models/prostateExam")
const AllExams = require("../models/allExams")
const Pacient = require("../models/pacient")
const Phrases = require("../models/phrases")
const nodemailer = require('nodemailer');
const path = require('path');
router.get("/getoneliver/:id",(req, res, next) => {

console.log(req.params.id)
LiverExam.findById(req.params.id)
.populate("pacient")
.then(response => {
  console.log(response)
  res.json(response);
})
.catch(err => {
  res.json(err);
})
})

router.post("/getphrases/:examType",(req, res, next) => {
  const { examType } = req.params
  Phrases.findOne({ exam: examType})
  .then(response => {
    console.log(response)
    res.json(response);
  })
  .catch(err => {
    res.json(err);
  })
})



// POST route => to create a new project
router.post('/newliver', (req, res, next) => {
const {clinica,medico,medicoSolicitante,data,pacient} = req.body
  LiverExam.create({
    clinica,
    medico,
    medicoSolicitante,
    data,
   pacient,
  
    })
    .then(responseLiver => {
    
      
      AllExams.create({
          exam: responseLiver._id,
          onModel: 'liverExams',
          pacient: responseLiver.pacient,
        })
        .then(response => {
          console.log(responseLiver)
          res.json(responseLiver);
        })
        .catch(err => {
          res.json(err);
        })

    })

});

router.put('/newfigadoview/:id', (req, res, next) => {
  const {dimensao,homogeneo,esteatotico,hepatopiaCronica,ciscoSimples,cistoSimplesMM,ciscoSimplesSit,variosCiscos,variosCiscosMM,variosCiscosSit,noduloSolido,noduloSolidoTipo,noduloSolidoContorno,noduloSolidoHMM,noduloSolidoVMM,noduloSolidoSi,calcificacaoGrosseira,calcificacaoGrosseiraMM,calcificacaoGrosseiraSit} = req.body
 
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
          message: 'Specified id is not valid'
        });
        return;
      }
      console.log(req.params.id)
      LiverExam.findByIdAndUpdate(req.params.id, {
        dimensao,homogeneo,esteatotico,hepatopiaCronica,ciscoSimples,cistoSimplesMM,ciscoSimplesSit,variosCiscos,variosCiscosMM,variosCiscosSit,noduloSolido,noduloSolidoTipo,noduloSolidoContorno,noduloSolidoHMM,noduloSolidoVMM,noduloSolidoSi,calcificacaoGrosseira,calcificacaoGrosseiraMM,calcificacaoGrosseiraSit
         })
        .then((response) => {
          console.log(response)
          res.json({
            response,
            message: `Project with ${req.params.id} is updated successfully.`
          });
        })
        .catch(err => {
          res.json(err);
        })
   
  
  });

  router.put('/newprostataview/:id', (req, res, next) => {
    const { homogenio,size1,size2,size3,contornos,residuo,residuoML,exameViaTransretal,noduloPeriferica,noduloPerifericaTipo,noduloSize1,noduloSize2,noduloSize3,noduloLocal,biopsia,fragmentos} = req.body
   
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.status(400).json({
            message: 'Specified id is not valid'
          });
          return;
        }
        console.log(req.params.id)
        ProstateExam.findByIdAndUpdate(req.params.id, {
          homogenio,size1,size2,size3,contornos,residuo,residuoML,exameViaTransretal,noduloPeriferica,noduloPerifericaTipo,noduloSize1,noduloSize2,noduloSize3,noduloLocal,biopsia,fragmentos
           })
          .then((response) => {
            console.log(response)
            res.json({
              response,
              message: `Project with ${req.params.id} is updated successfully.`
            });
          })
          .catch(err => {
            res.json(err);
          })
     
    
    });


router.post('/newprostate', (req, res, next) => {
  const {clinica,medico,medicoSolicitante,data,pacient} = req.body
  ProstateExam.create({

    clinica,
    medico,
    medicoSolicitante,
    data,
   pacient,
      //owner: req.user._id,

    })
    .then(response => {
      console.log("===>")
      console.log(response)
      res.json(response)
      AllExams.create({
          exam: response._id,
          onModel: 'prostateExams',
          pacient: response.pacient,


        })
        .then(response => {
          res.json(response)
        })
        .catch(err => {
          res.json(err);
        })
    })

});

router.post('/newpacient', (req, res, next) => {
  const {nome,idade,telefone,email,convenio} = req.body
  Pacient.create({
   
    nome,
    idade,
    telefone,
    email,
    convenio
     
    })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

router.post('/generateReport', (req, res, next) => {
  console.log(req.body.data)
  const generateReport = new GenerateReport()
  let filename = generateReport.writeFile(req.body.data)
  
  res.status(200).json( { filename } );
  
});

router.post('/send-email', (req, res, next) => {
  console.log(req.body)
  let { filename, data } = req.body;
  let absolutePath = path.resolve(`./public/reports/${filename}.pdf`)
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'onreportlaudos@gmail.com',
      pass: process.env.GMAILPASSWORD
    }
  });
  transporter.sendMail({
    from: 'laudos@onreport.com',
    // to: data.pacient.email, 
    to: data.email,
    subject: "Laudo OnReport", 
    text: "Segue laudo em anexo.",
    html: `<b>Prezado paciente ${data.paciente}, segue laudo em anexo.</b>`,
    attachments: [
      {   
          filename: `${filename}.pdf`,
          path: absolutePath
      }
    ] 
  })
  .then(info => res.status(200).json({ mensagem: "Sucesso"}))
  .catch(error => console.log(error));
});







router.get('/allexams', (req, res, next) => {

  AllExams.find()
    .populate('pacients')
    .populate('exam')
    .then(allFound => {
      
      res.json(allFound)
    })
    .catch(err => {
      res.json(err);
    });

});

router.delete('/exam/:id', (req, res, next) => {
  const { id } = req.params
  
  AllExams.findById(id)
    .populate('pacient')
    .then(exam => {
      const examId = exam.id
      const model = exam.onModel
      AllExams.findByIdAndDelete(examId)
        .then(response => {
          if(model === "liverExams"){
            LiverExam.findByIdAndDelete(examId)
              .then(response => console.log("Exame deletado com sucesso"))
              .catch(err => console.log(err))
          }else if(model === "prostateExams"){
            ProstateExam.findByIdAndDelete(examId)
              .then(response => console.log(response))
              .catch(err => console.log(err))
          }
        })
    })
    .catch(err => {
      res.json(err);
    });

});

router.get("/newprostataview/:id", (req, res, next) => {


  ProstateExam.findById(req.params.id).populate("pacient")
    .then(oneexam => {

      res.json(oneexam)


    })
    .catch(err => {
      res.json(err);
    });

});
router.get("/newfigadoview/:id", (req, res, next) => {


  LiverExam.findById(req.params.id).populate("pacient")
    .then(oneexam => {

      res.json(oneexam)


    })
    .catch(err => {
      res.json(err);
    });

});

router.get('/allpacients', (req, res, next) => {
 
  Pacient.find()
  
    .then(allFound => {
      res.json(allFound)

    })
    .catch(err => {
      res.json(err);
    });
   
});
router.get('/onepacient', (req, res, next) => {
 
  Pacient.find({'nome' : req.body.nome})
    
    .then(allFound => {
      res.json(allFound)

    })
    .catch(err => {
      res.json(err);
    });
   
});



module.exports = router;