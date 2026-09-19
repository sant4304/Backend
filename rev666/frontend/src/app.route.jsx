

import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";


export const router =createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
       path:"/register",
       element:<Register/>
    }
])



// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router'
// import Login from './features/auth/pages/Login'
// import Register from './features/auth/pages/Register'

// const AppRoute = () => {
//   return (
//     <div>
//         <BrowserRouter>
//          <Routes>

//             <Route path='/' element={<Login/>}/>
//             <Route path='/re' element={<Register/>}/>
//          </Routes>
//         </BrowserRouter>
//     </div>
//   )
// }

// export default AppRoute