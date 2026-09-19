import React from "react";
import { RouterProvider } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./fetures/auth/AuthProvider";
// import { AuthProvider } from "./fetures/auth.context";


const App = () => {
  return (
    <div>
         <AuthProvider>
           <AppRoute />
         </AuthProvider>
      {/* <RouterProvider router={AppRoute}/> */}
    </div>
  );
};

export default App;
