// Create document
// const toPdf = require('office-to-pdf')
const fs = require("fs")
const docx = require("docx")
const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Header,
    Footer
} = docx
const doc = new Document();
const path = require('path');
var docxConverter = require('docx-pdf');
const word2pdf = require('word2pdf');

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section

class GenerateReport {
    constructor() {

    }
    writeFile(dataExam) {
    
        let fileName = `laudo_${dataExam.paciente.replace(/ /g,'')}`
        let data = {
            header: {
                img: "teste.png",
                nomePaciente: `${dataExam.paciente}`,
                clinica: "Clínica do Coração",
                medico: dataExam.medico,
                medicoSolicitante: dataExam.medicoSolicitante,  
                convenio: dataExam.convenio,

            },
            body: {
                observacoes: dataExam.observacoes,
                conclusoes: dataExam.conclusoes
            }

        }
        const {
            header,
            body
        } = data

        const doc = new Document({
            title: 'laudo',
          
        });

        const image = doc.createImage(fs.readFileSync('Logo.jpg'),300,100)
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
            .createTextRun('Nome do Paciente: ' + header.nomePaciente)
            .font('Monospace')
            .bold();
        doc.createParagraph()
            .createTextRun('Clínica: ' + header.clinica)
            .font('Monospace')
            .bold();
        doc.createParagraph()
            .createTextRun('Medico: ' + header.medico)
            .font('Monospace')
            .bold();
        doc.createParagraph()
            .createTextRun('Medico Solicitante: ' + header.medicoSolicitante)
            .font('Monospace')
            .bold();
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
            .createTextRun('Observações: ')
            .font('Monospace')
            .bold();
        doc.createParagraph()
        doc.createParagraph()
            .createTextRun(body.observacoes)
            .tab()
            .font('Monospace')
            .bold();
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
        doc.createParagraph()
            .createTextRun('Conclusões: ')
            .font('Monospace')
            .bold();
        doc.createParagraph()
        doc.createParagraph()
            .createTextRun(body.conclusoes)
            .tab()
            .font('Monospace')
            .bold();
        const packer = new Packer();
        const convert = async () => {
            const data = await word2pdf(`./public/reports/${fileName}.docx`)
            fs.writeFileSync(`./public/reports/${fileName}.pdf`, data);
          }
        // Used to export the file into a .docx file
        packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync(`./public/reports/${fileName}.docx`, buffer);
            try {
                convert()
            } catch (error) {
                console.log(error)
            }
          
        });
        let absolutePath = path.resolve(`./public/reports/${fileName}.docx`);
        return fileName
    }



}


module.exports = GenerateReport;