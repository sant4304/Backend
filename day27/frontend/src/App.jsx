import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import "./features/shared/styles/global.scss"
import { AuthProvider } from './features/auth.context'

const App = () => {
  return (
    <div>
      <AuthProvider>
     <RouterProvider router={router}/>
     </AuthProvider>
    </div>
  )
}

export default App