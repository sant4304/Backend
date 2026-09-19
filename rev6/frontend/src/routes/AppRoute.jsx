import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../fetures/auth/pages/Login'
import Register from '../fetures/auth/pages/Register'


const AppRoute = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes >
            <Route path='/' element={<h1>Welcome to home page</h1>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoute




// import React from 'react'
// import { createBrowserRouter } from 'react-router-dom'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// export const AppRoute = createBrowserRouter(
//     [
//        {
//         path:"/",
//         element:<Login/>
//        },
//        {
//         path:"/register",
//         element:<Register/>
//        }
//     ]
// )