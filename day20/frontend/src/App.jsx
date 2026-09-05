import React from "react";

import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import "./features/shared/globel.scss";
import { AuthProvider } from "./features/auth/auth.context";

const App = () => {
  return (
    // <div>
    //   <AuthProvider>
    //     <RouterProvider router={router} />
    //   </AuthProvider>
    // </div>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
