const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const GenerateReport = require("../bin/GenerateReport")
const LiverExam = require("../models/liverExam.js")
const ProstateExam = require("../models/prostateExam")
const AllExams = require("../models/allExams")
const Pacient = require("../models/pacient")
const nodemailer = require('nodemailer');

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
          console.log(response)
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
  const { data, fileName } = req.body
  const generateReport = new GenerateReport()
  generateReport.writeFile(data, fileName)
  
});

router.post('/send-email', (req, res, next) => {
  let { email, subject, message, name } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'onreportlaudos@gmail.com',
      pass: process.env.GMAILPASSWORD
    }
  });
  transporter.sendMail({
    from: 'laudos@onreport.com',
    to: email, 
    subject: subject, 
    text: message,
    html: `<b>${message}</b>`,
    attachments: [
      {   
          filename: `laudo_${name}.pdf`,
          path: `/public/reports/laudo_${name}.pdf`
      }
    ] 
  })
  .then(info => res.render('message', {email, subject, message, info}))
  .catch(error => console.log(error));
});







router.get('/allexams', (req, res, next) => {

  AllExams.find()
    .populate('pacient')
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




module.exports = router;