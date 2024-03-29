import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// pages
import Auth from "../pages/Auth.page";
import Upload from "../pages/Upload.page";
import SongsList from "../pages/SongsList.page";

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
                  { path: "/songs", element: <SongsList /> },
            ],
      },
]);
