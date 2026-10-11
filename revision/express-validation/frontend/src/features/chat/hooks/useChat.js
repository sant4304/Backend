import { initializedSoketConnection } from "../service/chat.soket"

import { sendMessage ,getChats, getMessages } from "../service/chat.api"

import { useDispatch } from "react-redux"
import { setLoading , setChats, setCurrentChatId, createNewChat, addNewMessage, addMessages} from "../chat.slice"



export const useChat = ()=>{
   
    const dispatch = useDispatch()

     async function handleSendMessage({message , chatId}){
          dispatch(setLoading(true))
          const data = await sendMessage({message ,chatId})
          const {chat ,aiMessage} = data
          dispatch(createNewChat({
            chatId:chat._id,
            title:chat.title
          }))
          dispatch(addNewMessage({
            chatId:chat._id,
            content:message,
            role:"user"
          })),
          dispatch(addNewMessage({
            chatId:chat._id,
            content:aiMessage.content,
            role:aiMessage.role
          }))
          dispatch(setCurrentChatId(chat._id))
          dispatch(setLoading(false))

    }
  

    async function  handleGetChats(){
        dispatch(setLoading(true))
        const data = await getChats()
        const {chats} = data
        
        dispatch(
          setChats(
            chats.reduce((acc, chat) => {
              acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt
              };
        
              return acc;
            }, {})
          )
        );

        dispatch(setLoading(false))
    }

   async function handleOpenChat(chatId){
       const data = await getMessages(chatId)
       const {messages} = data 

       const formattedMessages = messages.map(msg=>({
        content:msg.content,
        role:msg.role
       }))
       dispatch(addMessages({
        chatId,
        messages:formattedMessages
       }))
       dispatch(setCurrentChatId(chatId))

   }

    return{
        initializedSoketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
}