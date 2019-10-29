const mongoose = require('mongoose');
const Phrases = require('../models/phrases');

//especificad@ foi a maneira encontrada de criar valores padrão para futura mudança via regex
mongoose.connect("mongodb://heroku_c9nwrzrj:m2o9v0hdh2chg8ck80k65iitv5@ds339968.mlab.com:39968/heroku_c9nwrzrj");

const phrases = [
  {
    exam:"liver" ,
    observations: [
  {
      name: "homogênio",
      text: "Fígado de morfologia, contornos e dimensões especificad@. Parênquima hepático homogêneo, com ecotextura e ecogenicidade especificad@."
    },{
      name: "hepatopatia crônica",
      text: "Fígado de contornos lobulados, bordas rombas, lobo direito de dimensões reduzidas, lobo esquerdo e caudado aumentados, apresentando ecotextura parenquimatosa difusamente grosseira e heterogênea",
      
    },{
      name: "cisto simples",
      text: "Fígado de morfologia, contornos e dimensões normais. Parênquima hepático homogêneo, com ecotextura e ecogenicidade normais, exceto por cisto com paredes finas e lisas , conteúdo anecóide, medindo especificad@ mm , localizado no segmento hepático especificad@1 ( Segmentação de Couinaund). ",
    },{
      name :"nodulo sólido",
      text: "Fígado de morfologia, contornos e dimensões normais. Parênquima hepático homogêneo, com ecotextura e ecogenicidade normais, exceto por nódulo sólido  hiperecogênico, medindo especificad@ mm , localizado no segmento hepático especificado@1"
    },{
      name:"calcificação grosseira",
      text: "Fígado de morfologia, contornos e dimensões normais. Parênquima hepático homogêneo, com ecotextura e ecogenicidade normais, exceto por calcificação grosseira, medindo cerca de especificad@ mm , localizado no segmento hepático especificad@1"
    }

    


    ]},
    {
      exam:"prostate" ,
      observations: [{
      name:"padrão",
      text: " Próstata de morfologia e contornos normais. Parênquima prostático com ecotextura habitual em avaliação por via transabdominal.Dimensões prostáticas: especificad@ mm.   "
      },{
        name: "transretal",
        text: "Próstata em topografia habitual , de contornos especificad@. Apresentando nódulo especificad@1 , localizado na região especificado@2 , medindo especificado@3 mm. Medidas da próstata : especificado@4 mm . Realizado biospia via transretal , com coleta de especificado@5 fragmentos .   "
      }
      
      ]
    }
    



    
 
]

Phrases.create(phrases, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${phrases.length} phrases`)
  mongoose.connection.close();
});