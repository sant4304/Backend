import {PDFParse} from 'pdf-parse'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from 'fs'
import { MistralAIEmbeddings } from "@langchain/mistralai";

import { Pinecone } from '@pinecone-database/pinecone';

import dotenv from "dotenv"
dotenv.config()

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY 
});

const index = pc.index("rag-rev")

let dataBuffer = fs.readFileSync('./story.pdf');

const parser = new PDFParse({
    data :dataBuffer
})

const data = await parser.getText()

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});



const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed",
})





const chunks = await splitter.splitText(data.text);

const docs = await Promise.all(chunks.map(async(chunk)=>{
    const embedding = await embeddings.embedQuery(chunk)
    return{
        text:chunk,
        embedding
    }
}))

// console.log(chunks,chunks.length);

// console.log(docs) /* 1024 */

const result = await index.upsert({
    records :docs.map((doc,i)=>({
        id:`doc-${i}`,
        values:doc.embedding,
        metadata:{
            text:doc.text
        }
    }))
})

console.log(result)