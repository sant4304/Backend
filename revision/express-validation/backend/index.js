// import readline from "readline"

// const rl = readline.createInterface(
//     {
//         input:process.stdin,
//         output:process.stdout
//     }
// )

// rl.question("who are you : ",(answer)=>{
//     console.log("Your name is ",answer)
//     rl.close()
// })

/**************************************************/
import "dotenv/config"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import readline from "readline"
import { AIMessage, HumanMessage } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});
/*****************************************************/ 
// const response = await model.invoke("how are you")
// console.log(response.content)

// function testAi(){
//     model.invoke("I am sam")
//     .then((response)=>{console.log(response.content)})
// }

// testAi()

// 

// async function testAi(){
//     const response = await model.invoke("I am sam")
//     console.log(response.content)
// }

// testAi()

const rl = readline.createInterface({
    input :process.stdin,
    output :process.stdout
})

// rl.question("who i am ",(input)=>{
//     console.log("i am sam ",input)
//     rl.close()
// })

const messages = []
async function chatWithGemini(userInput){
  
    messages.push(new HumanMessage(userInput))

    const response = await model.invoke(messages)

    messages.push( new AIMessage(response.content))

    console.log("Gemini : ",response.content)

    askQuestion()
}

function askQuestion(){
    rl.question("You : ",async(input)=>{
        if(input.toLowerCase()=== "exit"){
            rl.close()
            return
        }
     await chatWithGemini(input)   
    })
}

askQuestion()