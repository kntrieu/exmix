import fileSaver from 'file-saver';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { getWizartData } from './localStorageUtils';
import { AutorenewSharp } from '@material-ui/icons';

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

    if (!copies || copies.length === 0 || !wizartData) {
        return;
    }
    
    let sections = [];
    //loop to add sections
    copies.map((copy, index) => {

        let section = {
            properties: {},
            children: []
        };

        copy.map((quest, indexOfQuestion) => {


            let text = new TextRun({
                text: `Câu ${indexOfQuestion + 1}: ${quest.content}`,
                break: indexOfQuestion === 0 ? 0 : 1,
                size: 14 * 2
            });

            let paragraph = new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [text]
            });

            section.children.push(paragraph);

            quest.answers.map((asw) => {

                let answerParagraph = new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: `${asw.label}. ${asw.content}.`,
                            size: 14 * 2,
                            bold: asw.correct
                        })
                    ]
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