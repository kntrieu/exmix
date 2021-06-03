import fileSaver from 'file-saver';
import { 
    Document, 
    Packer, 
    Paragraph, 
    TextRun, 
    AlignmentType, 
    TabStopType 
} from "docx";
import { getWizartData } from './localStorageUtils';

const centimet = 1440 / 2.54; //convert DXA to centimet.

export const printExamDetails = () => {
    //let examDetails = getWizartData();
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                        }),
                        new TextRun({
                            text: "\tGithub is the best",
                            bold: true,
                        }),
                    ],
                }),
            ],
        }]
    });

    // Used to export the file into a .docx file
    Packer.toBlob(doc).then((blob) => {
        fileSaver.saveAs(blob, "example.docx");
    });

}

export const printCopies = (copies, wizartData) => {

    const wizart = getWizartData();

    if (!copies || copies.length === 0 || !wizartData) {
        return;
    }

    var examIds = [];

    //Create 3 numbers id
    const checkAndCreateExampId = () => {
        let id = Math.floor(Math.random() * 1000);
        if (examIds.indexOf(id) > -1) {
            checkAndCreateExampId();
        }

        examIds.push(id);
        return id;
    }
    
    let sections = [];

    //Create header paragraph
    const createHeaderParagragph = (id) => {
        let headerParagraph = new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: 'Trường THCS Nguyễn An Ninh'.toUpperCase(),
                    bold: true,
                    size: 14 * 2,
    
                }),
                new TextRun({
                    text: '\t' + wizart[0].value.toUpperCase(),
                    bold: true,
                    size: 14 * 2,
                }),
                new TextRun({
                    text: '\t' + `Môn: `,
                    bold: true,
                    size: 14 * 2,
                    break: 1
                }),
                new TextRun({
                    text: wizart[1].value,
                    size: 14 * 2,
                }),
                new TextRun({
                    text: '' + `Mã đề: ${id}`,
                    bold: true,
                    size: 14 * 2,
                    break: 1
                }),
                new TextRun({
                    text: '\t' + `Thời gian: `,
                    size: 14 * 2,
                    bold: true
                }),
                new TextRun({
                    text: wizart[3].value + 'phút',
                    size: 14 * 2,
                }),
                new TextRun({
                    text: 'ĐỀ CHÍNH THỨC',
                    size: 14 * 2,
                    break: 1,
                    bold: true
                }),
                new TextRun({
                    text: '\t' + `Năm học: `,
                    size: 14 * 2,
                    bold: true
                }),
                new TextRun({
                    text: wizart[2].value,
                    size: 14 * 2,
                }),
    
                //Add break lines
                new TextRun({
                    size: 14 * 2,
                    break: 2,
                }),
            ],
            tabStops: [
                {
                    type: TabStopType.LEFT,
                    position: 0 * centimet,
                },
                {
                    type: TabStopType.CENTER,
                    position: 12 * centimet,
                },
            ],
        });

        return headerParagraph;
    }
    
    //loop to add sections
    copies.map((copy, index) => {
        let id = checkAndCreateExampId();
        let section = {
            properties:{
            },
            children: [
                createHeaderParagragph(id)
            ]
        };

        copy.map((quest, indexOfQuestion) => {


            let questionNumber = new TextRun({
                text: `Câu ${indexOfQuestion + 1}:`,
                size: 14 * 2,
                bold: true,
                underline: true
            });

            let questionContent = new TextRun({
                text: ' ' + quest.content.trim(),
                size: 14 * 2,
            });

            let paragraph = new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [questionNumber, questionContent]
            });

            section.children.push(paragraph);

            quest.answers.map((asw) => {
                //Create answer 
                let answerParagraph = new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: `\t${asw.label}. ${asw.content.trim()}.`,
                            size: 14 * 2,
                        })
                    ],
                    tabStops: [
                        {
                            type: TabStopType.LEFT,
                            position: 1.25 * centimet, //Thụt vô 1.25 cm
                        }
                    ],
                });

                section.children.push(answerParagraph);

                return asw;
            });

            return quest;
        });

        sections.push(section);

        return copy;
         
    });

    let newDocument = new Document({
        sections: sections
    });

    // Used to export the file into a .docx file
    Packer.toBlob(newDocument).then((blob) => {
        fileSaver.saveAs(blob, "de-thi-da-tron.docx");
    });
}