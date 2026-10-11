import "dotenv/config"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import readline from "readline"
import { AIMessage, HumanMessage ,SystemMessage} from "@langchain/core/messages";

import { ChatMistralAI } from "@langchain/mistralai"

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
model: "ministral-8b-latest",
apiKey:process.env.MISTRAL_API_KEY 

});


export async function generateResponse(messages){
  let response = await geminiModel.invoke(messages.map(msg=>{
      if(msg.role=="user"){
        return new HumanMessage(msg.content)
      }
      else if(msg.role== "ai"){
        return new AIMessage(msg.content)
      }
    }))
  return response.text
}



export async function generateChatTitle(message){
    let response = await mistralModel.invoke([
        new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive
            titles for chat conversations.

            The user will provide the first message of a chat conversation.
            Generate a clear, relevant title in 2-4 words.
            Return ONLY the title. Do not use quotes or extra explanation.
        `),

        new HumanMessage(`
            Generate a title for a chat conversation based on this first message:

            "${message}"
        `)
    ])
    return  response.content
}
