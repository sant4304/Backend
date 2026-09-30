import {createBrowserRouter} from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"

export const AppRoutes = createBrowserRouter(
    [
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        }
    ]
)