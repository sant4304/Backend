import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {
   
   const chat = useChat()

   


    const {user} = useSelector(state =>state.auth )
    console.log(user)
   
    useEffect(()=>{
      chat.initializeSocketConnection()
    },[])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard