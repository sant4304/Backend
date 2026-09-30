import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function  testAi(){
    model.invoke("capital of america")
    .then((response)=>{console.log(response.text)})
}

