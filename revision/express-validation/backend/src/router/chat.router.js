import {Router} from "express"
import { getChats, getMessages, sendMessage } from "../controllers/chat.controller.js"
import { authUser } from "../middleware/auth.middleware.js"

const chatRouter = Router()

chatRouter.post("/message" ,authUser ,sendMessage)

chatRouter.get("/",authUser  ,getChats)

chatRouter.get("/:chatId/message", authUser ,getMessages)
export default chatRouter