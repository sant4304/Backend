import { ChatGoogle } from "@langchain/google";

import { ChatMistralAI } from "@langchain/mistralai";

import { ChatCohere } from "@langchain/cohere"
import config from "../config/config.js"


export const geminiModel = new ChatGoogle({
    model:"gemini-flash-latest",
    apiKey:config.GOOGLE_API_KEY
})

export const mistralAIMODEL = new ChatMistralAI({
    model :"ministral-8b-latest",
    apiKey:config.MISTRAL_API_KEY
})

export const cohereModel = new ChatCohere({
    model:"command-a-03-2025",
    apiKey:config.COHERE_API_KEY
})


// "command-r7b-12-2024"