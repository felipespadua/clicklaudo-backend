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

  LiverExam.create({

      date: req.body.date,
      pacient: req.body.pacient,
      owner: req.user._id


    })
    .then(response => {


      AllExams.create({
          exam: response._id,
          onModel: 'liverExams',
          pacient: response.pacient,
        })
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          res.json(err);
        })

    })

});


router.post('/newprostate', (req, res, next) => {

  ProstateExam.create({

      date: req.body.date,
      doctor: req.body.doctor,
      doctorRequester: req.body.doctorRequester,
      clinical: req.body.clinical,
      healthPlan: req.body.healthPlan,
      pacient: req.body.pacient,
      pacientName: req.body.pacientName,
      //owner: req.user._id,

    })
    .then(response => {

      console.log(response)
      AllExams.create({
          exam: response._id,
          onModel: 'prostateExams',
          pacient: response.pacient,


        })
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          res.json(err);
        })
    })

});

router.post('/newpacient', (req, res, next) => {
  Pacient.create({

      sex: req.body.sex,
      name: req.body.name
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


router.get('/oneexam/:id', (req, res, next) => {


  AllExams.findById(req.params.id).populate("pacient")
    .then(oneexam => {

      res.json(oneexam.pacient.sex)


    })
    .catch(err => {
      res.json(err);
    });

});




module.exports = router;