import {PDFParse} from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from "@pinecone-database/pinecone"; 
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()


let dataBuffer = fs.readFileSync("./story.pdf")



const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pc.index("cohort-rag")

// const parse = new PDFParse({data:dataBuffer})

// const data = await parse.getText()
// console.log(data)

const embeddings = new MistralAIEmbeddings(
    {
        apiKey:process.env.MISTRAL_API_KEY,
        model: "mistral-embed"
    }
)

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 0,
// });

// const text = "Your long text goes here...";


// const chunks = await splitter.splitText(data.text)

// // const docs = await embeddings.embedDocuments(chunks)

// const docs = await Promise.all(chunks.map(async(chunk)=>{
//     const embedding = await embeddings.embedQuery(chunk)
//     return{
//         text:chunk,
//         embedding
//     }
// }))

// // console.log(docs)



// const result = await index.upsert({
//     records:docs.map((doc,i)=>({
//           id:`doc-${i}`,
//         values:doc.embedding,
//         metadata:{
//             text:doc.text
//         }
//     }))
// })

const queryEmbedding = await embeddings.embedQuery("How was intership expirnce")

console.log(queryEmbedding)

const result = await index.query(
    {
        vector:queryEmbedding,
        topK:2,
       includeMetadata:true
    }
) 

console.log(JSON.stringify(result))