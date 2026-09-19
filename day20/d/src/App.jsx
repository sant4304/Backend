// import React from 'react'
import { RouterProvider } from "react-router"
import AppRoutes from "./AppRoutes.jsx"
import "./style.scss"
import { AuthProvider } from "./features/auth/auth.context.jsx"
const App = () => {
  return (
    <AuthProvider>
       <AppRoutes/>
    </AuthProvider>
  
  )
}

export default App