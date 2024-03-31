import React, { createContext, useContext, useState } from "react";

import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
// pages
import App from "../App";
import Auth from "../pages/Auth.page";
import Upload from "../pages/Upload.page";
import SongsList from "../pages/SongsList.page";

const AuthContext = createContext(undefined);

export const useAuth = () => useContext(AuthContext);

export const Router = createBrowserRouter([
      {
            path: "/",
            element: (
                  <AuthProvider>
                        <App />
                  </AuthProvider>
            ),
            children: [
                  {
                        path: "/auth",
                        element: <Auth />,
                  },
                  { path: "/upload", element: <Upload /> },
                  { path: "/songs", element: <SongsList /> },
            ],
      },
]);
