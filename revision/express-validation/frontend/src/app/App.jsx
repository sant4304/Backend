import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.router'
import { useAuth } from '../features/hook/useAuth'

const App = () => {

  // const {handelGetMe} = useAuth()

  const auth = useAuth()
  useEffect(()=>{
    // handelGetMe()
    auth.handelGetMe()
  },[])

  return (
    <div>
      <RouterProvider  router={router}/>
    </div>
  )
}

export default App