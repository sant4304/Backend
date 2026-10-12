// import { HumanMessage } from "@langchain/core/messages";
// import { StateSchema, MessagesValue, ReducedValue, StateGraph, START, END } from "@langchain/langgraph";

// import { geminiModel , mistralModel , cohereModel } from "./model.service.js";

// import { createAgent, providerStrategy} from "langchain";

// import type { GraphNode } from "@langchain/langgraph"
// import { z } from "zod"

// const State = new StateSchema({
//   messages: MessagesValue,
//   solution_1: new ReducedValue(z.string().default(""), {
//     reducer: (current, next) => {
//       return next
//     }
//   }),

//   solution_2: new ReducedValue(z.string().default(""), {
//     reducer: (current, next) => {
//       return next
//     }
//   }),

//   judge_recommendation: new ReducedValue(z.object().default({
//     solution_1_score: 0,
//     solution_2_score: 0,
//   }),{
//     reducer:(current ,next)=>{
//       return next
//     }
//   }

//   ),

// });


 
// const solutionNode: GraphNode<typeof State> = async(state: typeof State) => {
//   //  console.log(state.messages)

//   console.log(state)
   
   

//   const [ministral_solution ,cohere_solution] = await Promise.all([

//     mistralModel.invoke(state.messages[0].text),
//     cohereModel.invoke(state.messages[0].text)
//   ])   


//   return {
//     solution_1:ministral_solution.text,
//     solution_2:cohere_solution.text
//   }
// }

// const judgeNode :GraphNode <typeof state> =async(state : typeof State)=>{

//   console.log("invoking judge ",state)
//   const {solution_1 ,solution_2 } = state
    
//   const judge = createAgent({
//     model :geminiModel,
//     tools :[],
//     responseFormat:providerStrategy(z.object({
//       solution_1_score: z.number().min(0).max(10),
//       solution_2_score: z.number().min(0).max(10),
//     }))
//   })
 
//    const judgeResponse = await judge.invoke({
//   messages: [
//     new HumanMessage(`
//       You are a judge tasked with evaluating the quality of two solutions to a problem.

//       The probl
//       The firsem is: ${state.messages[0].text}
// t solution is: ${solution_1}

//       The second solution is: ${solution_2}

//       Please provide a score between 0 and 10 for each solution.
//       A score of 0 means the solution is completely incorrect or irrelevant.
//       A score of 10 means the solution is perfect and fully addresses the problem.
//     `),
//   ],
// });

// const result = judgeResponse.structuredResponse

// return {
//   judge_recomendation : result
// }

// }
// const graph = new StateGraph(State)
//   .addNode("solution", solutionNode)
//   .addNode("judge",judgeNode)
//   .addEdge(START, "solution")
//   .addEdge("solution","judge")
//   .addEdge("judge",END)
//   .compile();

// export default async function (userMessage: string) {
//   const result = await graph.invoke({
//     messages: [
//       new HumanMessage(userMessage)
//     ]
//   })

//   console.log(result)
//   return result.messages
// }


import { HumanMessage } from "@langchain/core/messages";

import {
  StateSchema,
  MessagesValue,
  ReducedValue,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

import type { GraphNode } from "@langchain/langgraph";

import {
  geminiModel,
  mistralModel,
  cohereModel,
} from "./model.service.js";

import { createAgent, providerStrategy } from "langchain";
import { z } from "zod";

// Define the graph state
const State = new StateSchema({
  messages: MessagesValue,

  solution_1: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => next,
  }),

  solution_2: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => next,
  }),

  judge_recommendation: new ReducedValue(
    z
      .object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
      })
      .default({
        solution_1_score: 0,
        solution_2_score: 0,
      }),
    {
      reducer: (current, next) => next,
    }
  ),
});

// Generate two solutions
const solutionNode: GraphNode<typeof State> = async (state) => {
  const problem = state.messages[0]?.content;

  if (typeof problem !== "string" || !problem.trim()) {
    throw new Error("Please provide a valid text problem.");
  }

  const [ministralSolution, cohereSolution] = await Promise.all([
    mistralModel.invoke(problem),
    cohereModel.invoke(problem),
  ]);

  return {
    solution_1: String(ministralSolution.content),
    solution_2: String(cohereSolution.content),
  };
};

// Judge both solutions
const judgeNode: GraphNode<typeof State> = async (state) => {
  console.log("Invoking judge...");

  const problem = String(state.messages[0]?.content ?? "");

  const judge = createAgent({
    model: geminiModel,
    tools: [],
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
      })
    ),
  });

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(`
You are an expert judge evaluating two AI-generated solutions.

Problem:
${problem}

Solution 1:
${state.solution_1}

Solution 2:
${state.solution_2}

Evaluate both solutions based on correctness, relevance,
completeness, and clarity.

Give each solution a score between 0 and 10.
A score of 0 means completely incorrect.
A score of 10 means an excellent, correct, complete solution.

Return the scores using the required structured response format.
      `),
    ],
  });

  const result = judgeResponse.structuredResponse;

  if (!result) {
    throw new Error("Gemini did not return structured judge scores.");
  }

  console.log("Judge scores:", result);

  return {
    judge_recommendation: result,
  };
};

// Build the graph
const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

// Export the graph execution function
export default async function (userMessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(userMessage)],
  });

  console.log("Final result:", result);

  return {
    messages: result.messages,
    solution_1: result.solution_1,
    solution_2: result.solution_2,
    judge_recommendation: result.judge_recommendation,
  };
}
