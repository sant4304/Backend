// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// const loader = new PDFLoader("./story.pdf");

// const data = await loader.load();

// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 10,
//     chunkOverlap: 0,
// });

// const chunks = await splitter.splitText(data)

// console.log(chunks);



// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { MistralAIEmbeddings } from "@langchain/mistralai";
// import { Pinecone } from "@pinecone-database/pinecone";

// import dotenv from "dotenv"
// dotenv.config()

// const pc = new Pinecone({
//     apiKey: process.env.PINECONE_API_KEY 
// });

// const index = pc.index("susi")


// const loader = new PDFLoader("./story.pdf");

// const data = await loader.load();

// const embedding = new MistralAIEmbeddings({
//     apiKey: process.env.MISTRAL_API_KEY,
//     model: "mistral-embed",
// })


// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 0,
// });

// // Extract text from each PDF page and split it into strings
// const chunks = [];

// for (const doc of data) {
//     const textChunks = await splitter.splitText(doc.pageContent);
//     chunks.push(...textChunks);
// }



// const docs = await Promise.all(chunks.map(async(chunk)=>{
//     const embedding = await embeddings.embedQuery(chunk)
//     return{
//         text:chunk,
//         embedding
//     }
// }))

// const result = await index.upsert({
//     records :docs.map((doc,i)=>({
//         id:`doc-${i}`,
//         values:doc.embedding,
//         metadata:{
//             text:doc.text
//         }
//     }))
// })

// console.log(result)
// console.log(chunks ,chunks.length);
// console.log("Total chunks:", chunks.length);





import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

// 1. Connect to Pinecone
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const index = pc.index("susi");

// 2. Load PDF
// const loader = new PDFLoader("./story.pdf");
// const data = await loader.load();

// console.log("PDF loaded successfully");

// 3. Split PDF text into chunks
// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 0,
// });

// const chunks = [];

// for (const doc of data) {
//     const textChunks = await splitter.splitText(doc.pageContent);
//     chunks.push(...textChunks);
// }

// console.log("Total chunks:", chunks.length);

// 4. Initialize Mistral embeddings
const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed",
});

// 5. Generate embeddings for all chunks
// const vectors = await embeddings.embedDocuments(chunks);

// console.log("Total embeddings:", vectors.length);
// console.log("Vector dimensions:", vectors[0]?.length);

// 6. Prepare Pinecone records
// const records = chunks.map((chunk, i) => ({
//     id: `doc-${i}`,
//     values: vectors[i],
//     metadata: {
//         text: chunk,
//     },
// }));

// 7. Store vectors in Pinecone
// const result = await index.upsert({
//     records,
// });

// console.log("Pinecone upsert result:", result);
// console.log("All vectors stored successfully!");

/***********************************************************************************************************/ 
const queryEmbedding = await embeddings.embedQuery("how was the internship experinece")

console.log(queryEmbedding)

const resultu = await index.query({
    vector:queryEmbedding,
    topK:2,
    includeMetadata:true
})

console.log(JSON.stringify(resultu))