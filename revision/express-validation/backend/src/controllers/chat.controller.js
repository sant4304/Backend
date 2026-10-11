
// import chatModel from "../model/chat.model.js";
// import messageModel from "../model/message.model.js";
// import {  generateChatTitle,generateResponse } from "../services/ai.service.js";

// export async function sendMessage(req,res){
 
//     const {message,chat:chatId} = req.body

    
//       let title = null,chat =null

//     if(!chat){
//         title = await generateChatTitle(message)
//         chat = await chatModel.create({
//         user:req.user.id,
//         title:title
//     })
//     }
//      else {
//       chat = await chatModel.findById(chatId);

//       if (!chat) {
//         return res.status(404).json({
//           message: "Chat not found",
//         });
//       }
//     }
    
//     console.log(chat._id)

   

//     const userMessage = await messageModel.create(
//         {
//             chat:chat._id || chatId,
//             content:message,
//             role:"user"
//         }
//     )

//     const messages = await messageModel.find({chat:chatId || chat._id })

//     const result = await generateResponse(messages)

//     const aiMessage = await messageModel.create(
//         {
//             chat:chat._id || chatId,
//             content:result,
//             role:"ai"
//         }
//     )

    

//     res.status(201).json(
//         {
//             message:"Chat Created",
//             chat,
//             userMessage,
//             aiMessage
//         }
//     )
    

// }


import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";
import {
  generateChatTitle,
  generateResponse
} from "../services/ai.service.js";

export async function sendMessage(req, res) {
  try {
    const { message, chat: chatId } = req.body;

    let title = null;
    let chat = null;

    // NEW CHAT
    if (!chatId) {
      title = await generateChatTitle(message);

      chat = await chatModel.create({
        user: req.user.id,
        title: title
      });
    }

    // EXISTING CHAT
    else {
      chat = await chatModel.findById(chatId);

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found"
        });
      }
    }

    console.log("CHAT ID:", chat._id);

    // Save user message
    const userMessage = await messageModel.create({
      chat: chat._id,
      content: message,
      role: "user"
    });

    // Get complete conversation
    const messages = await messageModel.find({
      chat: chat._id
    });

    console.log("MESSAGES:", messages);

    // Generate AI response
    const result = await generateResponse(messages);

    console.log("AI RESULT:", result);

    // Save AI message
    const aiMessage = await messageModel.create({
      chat: chat._id,
      content: result,
      role: "ai"
    });

    res.status(201).json({
      message: "Message sent successfully",
      chat,
      userMessage,
      aiMessage
    });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
}

export async function getChats(req,res){
    const chats = await chatModel.find({user:req.user.id})
    
    res.status(201).json(
        {
            message:"Chat Recived Successfully",
            chats
        }
    )
}

export async function getMessages(req,res){
    
    const {chatId} = req.params
    const user = req.user.id
    
    const chat = await chatModel.findOne({
        _id:chatId,
        user
    })

   const messages = await messageModel.find({
    chat:chatId
   })
    
    console.log(chatId)
    console.log(user)
    res.status(201).json(
        {
            message:"Message",
            messages
        }
    )

}