import React from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import { useEffect,useState  } from 'react'

const Dashboard = () => {
 
  const chat = useChat()


    const {user} = useSelector(state =>state.auth)

    const chats = useSelector(state=>state.chat.chats)

    const currentChatId = useSelector(state =>state.chat.currentChatId)

    useEffect(()=>{
       chat.initializedSoketConnection()
       chat.handleGetChats()
    },[])
    console.log(user)

  console.log(chats)

    const [chatInput, setChatInput] = useState("");

  const dummyMessages = [
    {
      id: 1,
      role: "user",
      content: "Hey, how are you?",
    },
    {
      id: 2,
      role: "ai",
      content: "I'm doing great! How can I help you today?",
    },
    {
      id: 3,
      role: "user",
      content: "Can you explain React to me?",
    },
    {
      id: 4,
      role: "ai",
      content:
        "Sure! React is a JavaScript library used to build user interfaces.",
    },

  ];


  
  const handleSubmitMessage = (event) => {
    event.preventDefault();
    const trimmedMessage = chatInput.trim()
    if(!trimmedMessage){
      return
    }
    setChatInput("");
    console.log(chatInput);

     chat.handleSendMessage({message:trimmedMessage ,chatId:currentChatId})
  
  };

  const openChat = (chatId) =>{
    chat.handleOpenChat(chatId)
  }

 

  return (
      <main className="min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5">
      <section className="mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border   p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 border-none">
        <aside className="hidden h-full w-72 shrink-0 rounded-3xl border  bg-[#080b12] p-4 md:flex md:flex-col">
          <h1 className="mb-5 text-3xl font-semibold tracking-tight">
            Perplexity
          </h1>

          <div className="space-y-2">
          { Object.values(chats).map((chat,index)=>(
            <button
            key={index}
            onClick={()=>{openChat(chat.id)}}
            type="button"
            className="w-full cursor-pointer rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white"
            >
                {chat.title}
            </button>
          ))}
          </div>
        </aside>

        <section className="relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4">
          <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">

           {chats[currentChatId]?.messages.map((message)=>(
            <div
            key={message.id}
            className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
                  message.role === "user"
                    ? "ml-auto rounded-br bg-white/12 text-white"
                    : "mr-auto border border-white/25 bg-[#0f1626] text-white/90"
                }`}
            >
              <p>{message.content}</p>
            </div>
           ))}
         
          </div>

          <footer className="rounded-3xl w-full absolute bottom-2 border border-white/60 bg-[#080b12] p-4 md:p-5">
            <form
              onSubmit={handleSubmitMessage}
              className="flex flex-col gap-3 md:flex-row"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(event) => {
                  setChatInput(event.target.value);
                  console.log(event.target.value);
                }}
                placeholder="Type your message..."
                className="w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  )
}

export default Dashboard