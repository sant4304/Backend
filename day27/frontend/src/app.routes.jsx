import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import FaceExpression from "./features/Expression/components/FaceExpression";



export const router = createBrowserRouter(
    [
        {
            path:"/",
            element:<FaceExpression/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        }
    ]
)