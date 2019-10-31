const express = require('express');
const mongoose = require('mongoose')
const router  = express.Router();
const LiverExam = require("../models/liverExam.js")
const ProstateExam = require("../models/prostateExam")
const AllExams = require("../models/allExams")
const Pacient = require("../models/pacient")


// POST route => to create a new project
router.post('/newliver', (req, res, next)=>{

 const { clinica,medico,medicoSolicitante,data,pacient} = req.body
 

  LiverExam.create({
     data: data,
    clinica: clinica,
    medico: medico,
    medicoSolicitante: medicoSolicitante,
    pacient: pacient
     
  
  })
  .then(response =>{
  console.log(response)

   AllExams.create({
    exam: response._id,
    onModel: 'liverExams',
     pacient:response.pacient,
     }) 
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })

  })
  
});


router.post('/newprostate', (req, res, next)=>{
 
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
    .then(response =>{
      
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

  router.post('/newpacient', (req, res, next)=>{
    const {dataDeNasc,nome,idade,telefone,email,convenio}=req.body
    Pacient.create({
      dataDeNasc,
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

router.get('/oneexam/:id', (req, res, next) => {
 
 
  AllExams.findById(req.params.id).populate("pacient")
    .then(oneexam => {
    
      res.json(oneexam.pacient.sex)


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