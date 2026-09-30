import React from "react";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={AppRoutes} />
      </AuthProvider>
    </div>
  );
};

export default App;
