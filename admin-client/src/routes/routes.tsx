import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// pages
import Auth from "../pages/auth.page";
import Upload from "../pages/upload.page";

export const Router = createBrowserRouter([
      {
            path: "/",
            element: <App />,
            children: [
                  {
                        path: "/auth",
                        element: <Auth />,
                  },
                  { path: "/upload", element: <Upload /> },
            ],
      },
]);
