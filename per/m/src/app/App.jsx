import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.rotues.jsx'
import { useAuth } from '../features/auth/hooks/useAuth.js'

const App = () => {
  
  const auth = useAuth()

  useEffect(()=>{
    auth.handleGetMe() 
  },[])

  return (
    <RouterProvider  router ={router} />
  )
}

export default App