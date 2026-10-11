// import "dotenv/config";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-3.1-flash-lite",
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export async function  testAi(){
//     model.invoke("capital of america")
//     .then((response)=>{console.log(response.text)})
// }

// testAi()
/********************************************************************************/ 
// import "dotenv/config";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-3.1-flash-lite",
//   apiKey: process.env.GEMINI_API_KEY,
// });


// async function chatWithGemini(message) {
//   const response = await model.invoke(message);

//   return response.content;
// }

// const result = await chatWithGemini("Hello Gemini");

// console.log(result);

/********************************************************************/ 
// import "dotenv/config";

// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// import {
//   StateGraph,
//   MessagesAnnotation,
//   START,
//   END,
// } from "@langchain/langgraph";

// import { HumanMessage } from "@langchain/core/messages";

// import readline from "readline";

// // 1. Gemini model
// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-3.1-flash-lite",
//   apiKey: process.env.GEMINI_API_KEY,
// });

// // 2. Chatbot function
// async function chatbot(state) {
//   const response = await model.invoke(state.messages);

//   return {
//     messages: [response],
//   };
// }

// // 3. Create LangGraph
// const graph = new StateGraph(MessagesAnnotation)
//   .addNode("chatbot", chatbot)
//   .addEdge(START, "chatbot")
//   .addEdge("chatbot", END)
//   .compile();

// // 4. Store conversation
// let messages = [];

// // 5. Terminal input
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function askQuestion() {
//   rl.question("You: ", async (userInput) => {
    
//     if (userInput.toLowerCase() === "exit") {
//       rl.close();
//       return;
//     }

//     // Add user's message
//     messages.push(new HumanMessage(userInput));

//     // Send all previous messages + new message
//     const result = await graph.invoke({
//       messages: messages,
//     });

//     // Get AI's latest message
//     const aiMessage = result.messages[result.messages.length - 1];

//     console.log("AI:", aiMessage.content);

//     // Save AI message
//     messages.push(aiMessage);

//     // Ask again
//     askQuestion();
//   });
// }

// // Start chat
// console.log("Gemini Chat Started!");
// console.log("Type 'exit' to stop.\n");

// askQuestion();


/*******************************************************************************/ 
// import readline from "readline";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("What is your name? ", (answer) => {
//   console.log("Your name is:", answer);

//   rl.close();
// });

/***************************************************************************/ 

// import "dotenv/config";
// import readline from "readline";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { HumanMessage, AIMessage } from "@langchain/core/messages";

// // Gemini
// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-3.1-flash-lite",
//   apiKey: process.env.GEMINI_API_KEY,
// });

// // Terminal
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Conversation memory
// const messages = [];

// async function chatWithGemini(userInput) {

//   // Save user's message
//   messages.push(new HumanMessage(userInput));

//   // Send conversation to Gemini
//   const response = await model.invoke(messages);

//   // Save Gemini's response
//   messages.push(new AIMessage(response.content));

//   console.log("Gemini:", response.content);

//   // Ask again
//   askQuestion();
// }

// function askQuestion() {
//   rl.question("You: ", async (input) => {

//     if (input.toLowerCase() === "exit") {
//       rl.close();
//       return;
//     }

//     await chatWithGemini(input);
//   });
// }

// // Start chat
// console.log("Gemini Chat Started!");
// console.log("Type 'exit' to stop.\n");

// askQuestion();
/************************************************/

// import "dotenv/config";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-3.1-flash-lite",
//   apiKey: process.env.GEMINI_API_KEY,
// });


// async function testAi(){
//   model.invoke("How are you")
//   .then((res)=>{console.log(res.content)})
// }

// testAi()

// const response = await model.invoke("How are you")
// console.log(response.content)

/**********************************************/

