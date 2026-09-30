// import { Mistral } from "@mistralai/mistralai";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new Mistral({
//     apiKey: process.env.MISTRAL_API_KEY,
// });

// async function main() {
//     const models = await client.models.list();

//     models.data.forEach((model) => {
//         console.log(model.id);
//     });
// }

// main();
/**********************************************************************/ 
// import { Mistral } from "@mistralai/mistralai";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new Mistral({
//     apiKey: process.env.MISTRAL_API_KEY,
// });

// async function main() {
//     try {
//         const response = await client.chat.complete({
//             model: "ministral-8b-latest",
//             messages: [
//                 {
//                     role: "user",
//                     content: "Hello! How are you?"
//                 }
//             ]
//         });

//         console.log(response.choices[0].message.content);

//     } catch (error) {
//         console.log("ERROR:", error);
//     }
// }

// main();
/************************************ */ 
import "dotenv/config"
import readline from "readline";
import { ChatMistralAI } from "@langchain/mistralai";

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})



const model = new ChatMistralAI({
// model: "ministral-8b-latest",
model:"ministral-14b-latest"
// model:"mistral-small-latest"

});
/********************************************************************************/ 
const response = await model.invoke("what is the capital of india")
console.log(response.text)

/*******************************************************************************/ 

// rl.question("What is your name ? ",(name)=>{
//     console.log(`hello ${name}`)
//     rl.close()
// })