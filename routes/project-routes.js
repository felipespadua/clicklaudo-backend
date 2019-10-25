const express = require('express');
const mongoose = require('mongoose')
const router  = express.Router();

const LiverExam = require("../models/liverExam.js")
const ProstateExam = require("../models/prostateExam")

// POST route => to create a new project
router.post('/newliver', (req, res, next)=>{
 
  LiverExam.create({
    
    date: req.body.date,
    doctor: req.body.doctor,
    doctorRequester: req.body.doctorRequester,
    clinical: req.body.clinical,
    healthPlan: req.body.healthPlan,
    sex: req.body.sex,
    pacientName: req.body.pacientName,
    pacientBornDate: req.body.pacientBornDate,
    pacientAge: req.body.pacientAge,
    pacientPhone: req.body.pacientPhone,
    pacientEmail: req.body.pacienteEmail

  
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

router.post('/newprostate', (req, res, next)=>{
 
ProstateExam.create({
    
    date: req.body.date,
    doctor: req.body.doctor,
    doctorRequester: req.body.doctorRequester,
    clinical: req.body.clinical,
    healthPlan: req.body.healthPlan,
    sex: req.body.sex,
    pacientName: req.body.pacientName,
    pacientBornDate: req.body.pacientBornDate,
    pacientAge: req.body.pacientAge,
    pacientPhone: req.body.pacientPhone,
    pacientEmail: req.body.pacienteEmail
    
  
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

let examsArr=[];
router.get('/allexams', (req, res, next) => {
 
  LiverExam.find()
    .then(allLiverProjects => {
      //res.json(allLiverProjects)
   examsArr.push(allLiverProjects)
   examsArr.push("a")
   console.log(examsArr)
    })
    .catch(err => {
      res.json(err);
    });
    ProstateExam.find()
    .then(allProstateProjects => {
      examsArr.push(allProstateProjects)
      res.json(allProstateProjects)
      
     
    })
    .catch(err => {
      res.json(err);
    })
    
    
  
    
});



module.exports = router;