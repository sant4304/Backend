import {Router} from "express"
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controllers.js"
import { authUser } from "../middleware/auth.middleware.js"

const chatRouter = Router()

chatRouter.post("/message",authUser,sendMessage)

chatRouter.get("/",authUser,getChats)

chatRouter.get("/:chatId/messages",authUser,getMessages)

chatRouter.delete("/delete/:chatId",authUser,deleteChat)

export default chatRouter