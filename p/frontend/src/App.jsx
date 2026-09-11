import React from "react";

import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import "./features/shared/globel.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { PostContextProvider } from "./features/post/post.context";

const App = () => {
  return (
    // <div>
    //   <AuthProvider>
    //     <RouterProvider router={router} />
    //   </AuthProvider>
    // </div>
    <AuthProvider>
      <PostContextProvider>
      <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
