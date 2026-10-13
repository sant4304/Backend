
import {
  StateSchema,
  type GraphNode,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

import * as z from "zod";
import { HumanMessage } from "@langchain/core/messages";

import {
  cohereModel,
  geminiModel,
  mistralAIMODEL,
} from "./model.ai.js";

// 1. Judge output schema
const JudgeSchema = z.object({
  solution_1_score: z.number().min(0).max(10),
  solution_2_score: z.number().min(0).max(10),
  solution_1_reasoning: z.string(),
  solution_2_reasoning: z.string(),
});

// 2. Define graph state
const State = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: JudgeSchema.default({
    solution_1_score: 0,
    solution_2_score: 0,
    solution_1_reasoning: "",
    solution_2_reasoning: "",
  }),
});

// 3. Generate solutions
const solutionNode: GraphNode<typeof State> = async (state) => {
  console.log("\n========== SOLUTION NODE ==========");
  console.log("Current state:", state);
  console.log("Problem:", state.problem);

  const [mistralResponse, cohereResponse] = await Promise.all([
    mistralAIMODEL.invoke(state.problem),
    cohereModel.invoke(state.problem),
  ]);

  const solution_1 = mistralResponse.content.toString();
  const solution_2 = cohereResponse.content.toString();

  console.log("\n---------- MISTRAL SOLUTION ----------");
  console.log(solution_1);

  console.log("\n---------- COHERE SOLUTION ----------");
  console.log(solution_2);

  console.log("\nBoth solutions generated successfully.");

  return {
    solution_1,
    solution_2,
  };
};

// 4. Judge solutions
const judgeNode: GraphNode<typeof State> = async (state) => {
  console.log("\n========== JUDGE NODE ==========");
  console.log("Current state:", state);

  console.log("\nSolution 1 sent to judge:", state.solution_1);
  console.log("\nSolution 2 sent to judge:", state.solution_2);

  const judgeModel = geminiModel.withStructuredOutput(JudgeSchema);

  const judgeResponse = await judgeModel.invoke([
    new HumanMessage(`
You are an impartial AI judge.

Problem:
${state.problem}

Solution 1 (Mistral):
${state.solution_1}

Solution 2 (Cohere):
${state.solution_2}

Evaluate correctness, relevance, completeness, and clarity.
Give each solution a score from 0 to 10.
Explain your scores separately.
`),
  ]);

  console.log("\n========== JUDGE RESULT ==========");
  console.dir(judgeResponse, { depth: null });

  console.log("\nSolution 1 score:", judgeResponse.solution_1_score);
  console.log("Solution 1 reasoning:", judgeResponse.solution_1_reasoning);

  console.log("\nSolution 2 score:", judgeResponse.solution_2_score);
  console.log("Solution 2 reasoning:", judgeResponse.solution_2_reasoning);

  return {
    judge: judgeResponse,
  };
};

// 5. Build graph
const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node", END)
  .compile();

// 6. Invoke graph
export default async function(problem: string) {
  console.log("\n========== STARTING GRAPH ==========");
  console.log("Input problem:", problem);

  try {
    const result = await graph.invoke({ problem });

    console.log("\n========== FINAL GRAPH RESULT ==========");
    console.dir(result, { depth: null });

    console.log("\n========== FINAL SOLUTIONS ==========");
    console.log("Mistral:", result.solution_1);
    console.log("Cohere:", result.solution_2);

    console.log("\n========== FINAL JUDGE SCORES ==========");
    console.log("Mistral score:", result.judge.solution_1_score);
    console.log("Mistral reasoning:", result.judge.solution_1_reasoning);
    console.log("Cohere score:", result.judge.solution_2_score);
    console.log("Cohere reasoning:", result.judge.solution_2_reasoning);

    return result;
  } catch (error) {
    console.error("\n========== GRAPH ERROR ==========");
    console.error(error);
    throw error;
  }
}






// import { StateSchema, MessagesValue, type GraphNode, StateGraph, START, END } from "@langchain/langgraph";
// import z from "zod"
// import { cohereModel, geminiModel, mistralAIMODEL } from "./model.ai.js";

// import { createAgent ,HumanMessage,providerStrategy ,toolStrategy} from "langchain";


// const state = new StateSchema({
//   problem : z.string().default(""),
//   solution_1 : z.string().default(""),
//   solution_2 : z.string().default(""),
//   judge:z.object({
//     solution_1_score : z.number().default(0),
//     solution_2_score : z.number().default(0),
//     solution_1_reasoning : z.string().default(""),
//     solution_2_reasoning : z.string().default(""),
//   })
// });


// const solutionNode:GraphNode<typeof state> = async(state)=>{
//     const[mistralResponse ,cohereResponse] = await Promise.all([
//         mistralAIMODEL.invoke(state.problem),
//     cohereModel.invoke(state.problem)
//     ])
//     return{
//         solution_1: mistralResponse.text,
//         solution_2: cohereResponse.text
//     }
// }


// const judgeNode:GraphNode<typeof state> = async(state)=>{
//     const { problem, solution_1, solution_2 } = state
//     const judge = createAgent({
//         model:geminiModel,
//         responseFormat:providerStrategy(z.object({
            
//             solution_1_score : z.number().min(0).max(10),
//             solution_2_score : z.number().min(0).max(10),
//             solution_1_reasoning : z.string(),
//             solution_2_reasoning : z.string(),
//         })),
//         systemPrompt:`You are a judge tasked with evaluating two solutions generated by different AI models. Please provide a score out of 10 for each solution, along with your reasoning for the scores.`
//     })

//     const judgeResponse = await judge.invoke({
//         messages:[
//             new HumanMessage(`
//                 Problem: ${problem}
//                 Solution 1: ${solution_1}
//                 Solution 2: ${solution_2}
//                 Please evaluate the solutions and provide scores and reasoning.
//                 `)
//         ]
//     })

//     const {
//         solution_1_score,
//         solution_2_score,
//         solution_1_reasoning,
//         solution_2_reasoning
//     } =judgeResponse.structuredResponse


     
 


//     return{
//         judge:{
//             solution_1_score,
//             solution_2_score,
//             solution_1_reasoning,
//             solution_2_reasoning
//         }
//     }
// }


// const graph = new StateGraph(state)
//    .addNode("solution",solutionNode)
//    .addNode("judge_node",judgeNode)
//    .addEdge(START , "solution")
//    .addEdge("solution","judge_node")
//    .addEdge("judge_node",END)
//    .compile()


//  export default async function(problem:string){
//      const result = await graph.invoke({problem:problem})

//      return result
//  }  