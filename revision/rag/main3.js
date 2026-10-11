import {PDFParse} from 'pdf-parse'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from 'fs'
import { MistralAIEmbeddings } from "@langchain/mistralai";

import dotenv from "dotenv"
dotenv.config()

let dataBuffer = fs.readFileSync('./story.pdf');

const parser = new PDFParse({
    data :dataBuffer
})

const data = await parser.getText()

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});



const embedding = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed",
})





const chunks = await splitter.splitText(data.text);

const docs = await embedding.embedDocuments(chunks)

// console.log(chunks,chunks.length);

console.log(docs)