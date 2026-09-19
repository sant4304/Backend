import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.route";
import { AuthProvider } from "./features/auth/auth.context";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
};

export default App;
