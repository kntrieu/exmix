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
const mainFont = 'Times New Roman';
const defaultPageMargin = {
    margin: {
        top: 2 * centimet,
        right: 2 * centimet,
        bottom: 2 * centimet,
        left: 3 * centimet,
    }
};


//Create header paragraph
const createHeaderParagragph = (id) => {
    const wizart = getWizartData();
    let headerParagraph = new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
            new TextRun({
                font: mainFont,
                text: 'Trường THCS Nguyễn An Ninh'.toUpperCase(),
                bold: true,
                size: 14 * 2,
            }),
            new TextRun({
                font: mainFont,
                text: '\t' + wizart[0].value.toUpperCase(),
                bold: true,
                size: 14 * 2,
            }),
            new TextRun({
                font: mainFont,
                text: `\tMôn: `,
                bold: true,
                size: 14 * 2,
                break: 1
            }),
            new TextRun({
                font: mainFont,
                text: wizart[1].value,
                size: 14 * 2,
            }),
            new TextRun({
                font: mainFont,
                text: `Mã đề: ${id}`,
                bold: true,
                size: 14 * 2,
                break: 1
            }),
            new TextRun({
                font: mainFont,
                text: `\tThời gian: `,
                size: 14 * 2,
                bold: true
            }),
            new TextRun({
                font: mainFont,
                text: wizart[3].value + 'phút',
                size: 14 * 2,
            }),
            new TextRun({
                font: mainFont,
                text: 'ĐỀ CHÍNH THỨC',
                size: 14 * 2,
                break: 1,
                bold: true
            }),
            new TextRun({
                font: mainFont,
                text: `\tNăm học: `,
                size: 14 * 2,
                bold: true
            }),
            new TextRun({
                font: mainFont,
                text: wizart[2].value,
                size: 14 * 2,
            }),

            //Add break lines
            new TextRun({
                font: mainFont,
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

const getLongestAnswer = (answers) => {
    let longestAnswer = 0;
    answers.map(answer => {
        if(answer.content.length > longestAnswer) {
            longestAnswer = answer.content.length;
        }

        return  answer;
    });

    return longestAnswer;
}


const createAnswerLayout = (answers) => {
    if (!answers || answers.length === 0) {
        return;
    }

    const longestChars = getLongestAnswer(answers);
    let children = [];
    let answerParagraph;
    

    if (longestChars <= 10) {
        answers.map((answer, indexOfAnswer) => {
            let answerText = new TextRun({
                font: mainFont,
                text: `\t${answer.label}. ${answer.content.trim()}`,
                size: 14 * 2,
            });

            children.push(answerText);
            return answer;
        });

        answerParagraph = new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [...children],
            tabStops: [
                {
                    type: TabStopType.LEFT,
                    position: 1.25 * centimet, //Thụt vô 1.25 cm
                },
                {
                    type: TabStopType.LEFT,
                    position: 4.5 * centimet, //Thụt vô 4.5 cm
                },
                {
                    type: TabStopType.LEFT,
                    position: 8 * centimet, //Thụt vô 8 cm
                },
                {
                    type: TabStopType.LEFT,
                    position: 12 * centimet, //Thụt vô 12 cm
                }
            ],
        });

        return answerParagraph

    } else if (longestChars <= 25) {
        answers.map((answer, indexOfAnswer) => {
            let answerText = new TextRun({
                font: mainFont,
                text: `\t${answer.label}. ${answer.content.trim()}`,
                size: 14 * 2,
                break: indexOfAnswer % 2 === 0 && indexOfAnswer !== 0
            });

            children.push(answerText);

            return answer;
        });

        answerParagraph = new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [...children],
            tabStops: [
                {
                    type: TabStopType.LEFT,
                    position: 1.25 * centimet, //Thụt vô 1.25 cm
                },
                {
                    type: TabStopType.LEFT,
                    position: 8 * centimet, //Thụt vô 8 cm
                }
            ]
        });

        return answerParagraph;

    } else {
        answers.map((answer, indexOfAnswer) => {
            let answerText = new TextRun({
                font: mainFont,
                text: `\t${answer.label}. ${answer.content.trim()}`,
                size: 14 * 2,
                break: indexOfAnswer > 0 ? 1 : 0
            });

            children.push(answerText);

            return answer;
        });

        answerParagraph = new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [...children],
            tabStops: [
                {
                    type: TabStopType.LEFT,
                    position: 1.25 * centimet, //Thụt vô 1.25 cm
                }
            ]
        });

        return answerParagraph
    }
}

export const printCopies = (copies, wizartData) => {

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

    //loop to add sections
    copies.map((copy, index) => {
        let id = checkAndCreateExampId();
        let section = {
            properties: {
                page: defaultPageMargin
            },
            children: [
                createHeaderParagragph(id)
            ]
        };

        copy.map((quest, indexOfQuestion) => {

            let questionNumber = new TextRun({
                font: mainFont,
                text: `Câu ${indexOfQuestion + 1}:`,
                size: 14 * 2,
                bold: true,
                underline: true
            });

            let questionContent = new TextRun({
                font: mainFont,
                text: ' ' + quest.content.trim(),
                size: 14 * 2,
            });

            let paragraph = new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [questionNumber, questionContent]
            });

            section.children.push(paragraph);

            // quest.answers.map((asw) => {
            //     //Create answer 
            //     let answerParagraph = new Paragraph({
            //         alignment: AlignmentType.LEFT,
            //         children: [
            //             new TextRun({
            //                 font: mainFont,
            //                 text: `\t${asw.label}. ${asw.content.trim()}.`,
            //                 size: 14 * 2,
            //             })
            //         ],
            //         tabStops: [
            //             {
            //                 type: TabStopType.LEFT,
            //                 position: 1.25 * centimet, //Thụt vô 1.25 cm
            //             }
            //         ],
            //     });

            //     section.children.push(answerParagraph);

            //     return asw;
            // });

            let answersParagraph = createAnswerLayout(quest.answers);
            section.children.push(answersParagraph);

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