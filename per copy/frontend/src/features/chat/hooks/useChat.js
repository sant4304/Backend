import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages } from "../chat.slice";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()


    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId })
        const { chat, aiMessage } = data
        if (!chatId)
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title,
            }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: message,
            role: "user",
        }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: aiMessage.content,
            role: aiMessage.role,
        }))
        dispatch(setCurrentChatId(chat._id))
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

   async function handleOpenChat(chatId, chats) {
    console.log("chatId:", chatId);
    console.log("chat:", chats[chatId]);

    // Check whether messages are already loaded
    if (chats[chatId]?.messages?.length === 0) {
        try {
            const data = await getMessages(chatId);

            console.log("getMessages response:", data);

            // Get messages safely
            const messages = data?.messages || [];

            const formattedMessages = messages.map((msg) => ({
                content: msg.content,
                role: msg.role,
            }));

            dispatch(
                addMessages({
                    chatId,
                    messages: formattedMessages,
                })
            );
        } catch (error) {
            console.error("Error loading messages:", error);
        }
    }

    dispatch(setCurrentChatId(chatId));
}

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }

}