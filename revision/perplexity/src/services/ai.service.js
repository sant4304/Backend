import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-5.6-luna",
  apiKey: process.env.OPENAI_API_KEY,
});

export function askQuestion() {
  model
    .invoke("What is the capital of India?")
    .then((response) => {
      console.log(response.content);
    });
}
