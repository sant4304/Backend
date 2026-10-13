
import {
  StateSchema,
  MessagesValue,
  type GraphNode,
  StateGraph,
  START,
  END,
  ReducedValue,
} from "@langchain/langgraph";

import { HumanMessage } from "@langchain/core/messages";
import { createAgent, providerStrategy } from "langchain";
import { z } from "zod";

import {
  cohereModel,
  geminiModel,
  mistralModel,
} from "./model.service.js";

const JudgeSchema = z.object({
  solution_1_score: z.number().min(0).max(10),
  solution_2_score: z.number().min(0).max(10),
});

const State = new StateSchema({
  messages: MessagesValue,

  solution_1: new ReducedValue(z.string().default(""), {
    reducer: (_current, next) => next,
  }),

  solution_2: new ReducedValue(z.string().default(""), {
    reducer: (_current, next) => next,
  }),

  judge_recommendation: new ReducedValue(
    JudgeSchema.default({
      solution_1_score: 0,
      solution_2_score: 0,
    }),
    {
      reducer: (_current, next) => next,
    },
  ),
});

// Generate two solutions in parallel.
const solutionNode: GraphNode<typeof State> = async (state) => {
  const problem = String(state.messages[0]?.content ?? "");

  if (!problem) {
    throw new Error("User problem is empty.");
  }

  const [mistralSolution, cohereSolution] = await Promise.all([
    mistralModel.invoke(problem),
    cohereModel.invoke(problem),
  ]);

  return {
    solution_1: String(mistralSolution.content),
    solution_2: String(cohereSolution.content),
  };
};

// Evaluate both solutions using Gemini.
const judgeNode: GraphNode<typeof State> = async (state) => {
  console.log("Invoking judge...");

  const problem = String(state.messages[0]?.content ?? "");
  const { solution_1, solution_2 } = state;

  if (!solution_1 || !solution_2) {
    throw new Error("Both solutions are required for judging.");
  }

  const judge = createAgent({
    model: geminiModel,
    tools: [],
    responseFormat: providerStrategy(JudgeSchema),
  });

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(`
You are an impartial judge comparing two AI-generated solutions.

Original problem:
${problem}

Solution 1 (Mistral):
${solution_1}

Solution 2 (Cohere):
${solution_2}

Evaluate each solution independently for correctness,
relevance, completeness, and clarity.

Give each solution a score between 0 and 10.
0 means completely incorrect; 10 means fully correct
and complete.

Return the scores using the required structured output.
Do not favor either model.
`),
    ],
  });

  const result = JudgeSchema.parse(judgeResponse.structuredResponse);

  console.log("Judge result:", result);

  return {
    judge_recommendation: result,
  };
};

// Build the graph.
const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

// Export the graph runner.
export default async function runGraph(userMessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(userMessage)],
  });

  console.log("Final result:", result);

  return result;
}





// import {
//   StateSchema,
//   MessagesValue,
//   type GraphNode,
//   StateGraph,
//   START,
//   END,
//   ReducedValue,
// } from "@langchain/langgraph";
// import { HumanMessage } from "langchain";

// import { z } from "zod";
// import { cohereModel, geminiModel, mistralModel } from "./model.service.js";

// import { createAgent, providerStrategy } from "langchain";

// const State = new StateSchema({
//   messages: MessagesValue,
//   solution_1: new ReducedValue(z.string().default(""), {
//     reducer: (current, next) => {
//       return next;
//     },
//   }),

//   solution_2: new ReducedValue(z.string().default(""), {
//     reducer: (current, next) => {
//       return next;
//     },
//   }),

//   judge_recomendation: new ReducedValue(
//     z.string().default({
//       solution_1_score: 0,
//       solution_2_score: 0,
//     }),
//     {
//       reducer: (current, next) => {
//         return next;
//       },
//     },
//   ),
// });

// const solutionNode: GraphNode<typeof State> = async (state) => {
//   console.log(state.messages);

//   const [mistral_solution, cohere_solution] = await Promise.all([
//     mistralModel.invoke(state.messages[0].text),
//     cohereModel.invoke(state.messages[0].text),
//   ]);

//   return {
//     solution_1: mistral_solution.text,
//     solution_2: cohere_solution.text,
//   };
// };

// const judgeNode: GraphNode<typeof State> = async (state) => {
//     console.log("Invoking judge...",state);

//   const { solution_1, solution_2 } = state;

// //   const problem = String(state.messages[0]?.content ?? "");

//   const judge = createAgent({
//     model: geminiModel,
//     tools: [],
//     responseFormat: providerStrategy(
//       z.object({
//         solution_1_score: z.number().min(0).max(10),
//         solution_2_score: z.number().min(0).max(10),
//       }),
//     ),
//   });
      
//      const judgeResponse = await judge.invoke({
//     messages: [
//     new HumanMessage(`
//       You are a judge tasked with evaluating the quality of two solutions to a problem.

//       The problm
//       The firsem is: ${state.messages[0].text}
// t solution is: ${solution_1}

//       The second solution is: ${solution_2}

//       Please provide a score between 0 and 10 for each solution.
//       A score of 0 means the solution is completely incorrect or irrelevant.
//       A score of 10 means the solution is perfect and fully addresses the problem.
//     `),
//   ],
// });

//     const result = judgeResponse.structuredResponse
 
//    return {
//     judge_recommedation :result
//    }

//     };

// const graph = new StateGraph(State)
//   .addNode("solution", solutionNode)
//   .addNode("judge",judgeNode)
//   .addEdge(START, "solution")
//   .addEdge("solution","judge")
//   .addEdge("judge", END)
//   .compile();

// export default async function (userMessage: string) {
//   const result = await graph.invoke({
//     messages: [new HumanMessage(userMessage)],
//   });

//   console.log(result);

//   return result.messages;
// }
