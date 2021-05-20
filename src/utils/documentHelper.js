import fileSaver from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { getWizartData } from './localStorageUtils';

export const printExamDetails = () => {
    //let examDetails = getWizartData();
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
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