import { StateSchema, MessagesValue, type GraphNode, StateGraph, START, END } from "@langchain/langgraph";
import { HumanMessage } from "langchain";

const State = new StateSchema({
  messages: MessagesValue,
});

const solutionNode :GraphNode<typeof State>=(state)=>{
    console.log(state.messages)

    return{
        messages:state.messages[0] 
    }
}

const graph = new StateGraph(State)
  .addNode("solution",solutionNode)
  .addEdge(START ,"solution")
  .compile()



export default async function(userMessage:string){
    const result = await graph.invoke({
        messages:[
            new HumanMessage(userMessage)
        ]
    })
}
