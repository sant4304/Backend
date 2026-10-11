import { response } from "express";
import {
  gernerateResponse,
  generateChatTitle,
} from "../services/ai.services.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";


export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;
  /*******************************************************************/
  const user = req.user.id;
  const username = req.user.username;
  console.log(user, username);
  console.log(message);
  /****************************************************************************/

  console.log("##################");

  let title = null,
    chat = null;

  if (!chatId) {
    title = await generateChatTitle(message);
    console.log(title);
    chat = await chatModel.create({
      user: user,
      title,
    });
  }
  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId });

  
  console.log("######################################");
  console.log(chatId);

    const result = await gernerateResponse(messages);
    console.log(messages);
    const aiMessage = await messageModel.create({
      chat: chatId || chat._id,
      content: result,
      role: "ai",
    });

    res.status(201).json({
      title,
      chat,
      aiMessage,
    });


}


export async function getChats(req,res){
    const user = req.user

    const chats = await chatModel.find({user:user.id})
    res.status(201).json(
        {
            message:"Chat recived successfully",
            chats
        }
    )
}

export async function getMessages(req,res){
    
    const {chatId} = req.params

    const chat = await chatModel.findOne({
        _id:chatId,
        user:req.user.id
    })

    if(!chat){
          
        return res.status(404).json({
            message:"Chat not found"
        })

    }

    const message = await messageModel.find({chat:chatId})

    res.status(201).json(
        {
            message:"Message retrive",
            message
        }
    )
}

export async function deleteChat(req,res){

    const {chatId} = req.params

    const chat = await chatModel.findOneAndDelete(
        {
            _id:chatId,
            user:req.user.id
        }
    )

    await messageModel.deleteMany(
        {
            chat:chatId
        }
    )

    if(!chat){
        return res.status(404).json({message:"Chat not found"})
    }

    res.status(201).json({
        message:"Chat deleted Successfully"
    })
}