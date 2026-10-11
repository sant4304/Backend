import {PDFParse} from 'pdf-parse'
import fs from 'fs'

let dataBuffer = fs.readFileSync('./story.pdf');

const parser = new PDFParse({
    data :dataBuffer
})

const data = await parser.getText()

console.log(data)


// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// async function loadPDF() {
//   const loader = new PDFLoader("./story.pdf");

//   const docs = await loader.load();

//   console.log(docs);
//   console.log("PDF Text:", docs[0]?.pageContent);
// }

// loadPDF();