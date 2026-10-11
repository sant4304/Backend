import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name:'chat',
    initialState:{
        chats:{},
        currentChatId:null,
        isLoading:false,
        error:null
    },
    reducers:{
        createNewChat:(state,action)=>{
            const {chatId,title} = action.payload
            state.chats[chatId]={
                id:chatId,
                title,
                messages:[],
                lastUpdated:new Date().toISOString()
            }
        },
        addMessages:(state,action)=>{
                 const {chatId, messages} = action.payload
                 state.chats[chatId].messages.push(...messages)
        },

        addNewMessage:(state,action)=>{
           const {content,chatId,role} = action.payload
           
           state.chats[chatId].messages.push({content,role})

        },

        setChats:(state,action)=>{
            state.chats = action.payload
        },
        setCurrentChatId:(state,action)=>{
            state.currentChatId = action.payload
        },
        setLoading:(state,action)=>{
            state.isLoading = action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload
        }
    }
})


export const {setChats ,setCurrentChatId , setLoading ,ssetError , createNewChat ,addNewMessage ,addMessages } = chatSlice.actions

export default chatSlice.reducer


// chats ={
//     "docker and aws":{
//         messages:[
//             {
//                 role:"user",
//                 content:"What is docer"
//             },
//             {
//                 role:"ai",
//                 content:"Docker is platform to allow the automate"
//             }
//         ],
//         id:"Docker and aws",
//         lastUpdated:""

//     }

// }