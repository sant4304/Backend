

import "dotenv/config"
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import { sendEmail } from "./mailservice.js";
import * as z from "zod";


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this tool to send an email",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email"),
        })
    }
)



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const model = new ChatMistralAI({
    model: "ministral-14b-latest",
})

const agent = createAgent({
    model,
    tools: [ emailTool ]
})

const messages = []

while (true) {
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({
        messages
    })

    messages.push(response.messages[ response.messages.length - 1 ])



    console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)
}
/******************************************************************************/ 



// import "dotenv/config"
// import readline from "readline/promises";
// import { ChatMistralAI } from "@langchain/mistralai";
// import { HumanMessage ,tool ,createAgent} from "langchain";
// import { sendEmail } from "./mailservice.js";
// import * as z from "zod"



// const emailTool = tool(
//     sendEmail,
//     {
//         name:"emailTool",
//         description:"User this tool to send an email",
//         schema: z.object(
//             {
//                 to:z.string().describe("To recipient email address"),
//                 html:z.string().describe("To html content of this email"),
//                 subject:z.string().describe("The subject of the email")
//             }
//         )
//     }
// )


// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })

// const model = new ChatMistralAI({
// model:"ministral-14b-latest"
// // model:"codestral-latest"
// // model:"mistral-vibe-cli-fast"
// });

// const agent = createAgent(
//     {
//         model,
//         tools:[emailTool]
//     }
// )

// // const response = await model.invoke("what is the capital of india ?under 10 words")
// // console.log(response.text)

// const messages =[]

// while(true){
//    const userInput = await rl.question("\x1b[32m[You]:\x1b[0m ")
//    messages.push(new HumanMessage(userInput))

//    const response = await agent.invoke({
//     messages
//    })
//    messages.push(response.messages[response.messages.length-1])
//    console.log(response.messages[response.messages.length-1].content)

// //   console.log(`\x1b[34m[AI]:\x1b[0m ${response.content}` )

// }
// rl.close()



















/**************************************************************************************/ 
// import { Mistral } from "@mistralai/mistralai";
// import dotenv from "dotenv";
// import readlineSync from "readline-sync";

// dotenv.config();

// const client = new Mistral({
//     apiKey: process.env.MISTRAL_API_KEY,
// });

// // Conversation history
// const messages = [];

// async function chat() {
//     console.log("🤖 Mistral Chatbot");
//     console.log("Type 'exit' to stop.\n");

//     while (true) {

//         // Get question from user
//         const question = readlineSync.question("You: ");

//         // Exit chatbot
//         if (question.toLowerCase() === "exit") {
//             console.log("Goodbye! 👋");
//             break;
//         }

//         // Add user message
//         messages.push({
//             role: "user",
//             content: question,
//         });

//         try {
//             // Send conversation to AI
//             const response = await client.chat.complete({
//                 model: "ministral-8b-latest",
//                 messages: messages,
//             });

//             // Get AI response
//             const answer = response.choices[0].message.content;

//             console.log(`AI: ${answer}\n`);

//             // Add AI response to conversation history
//             messages.push({
//                 role: "assistant",
//                 content: answer,
//             });

//         } catch (error) {
//             console.log("Error:", error.message);
//         }
//     }
// }

// chat();