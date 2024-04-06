import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Auth from "../pages/Auth.page";
import Upload from "../pages/Upload.page";
import SongsList from "../pages/SongsList.page";
import Edit from "../pages/Edit.page";
export const Router = createBrowserRouter([
      {
            path: "/",
            element: <App />,
            children: [
                  {
                        path: "/songs",
                        element: <SongsList />,
                  },
                  {
                        path: "/upload",
                        element: <Upload />,
                  },
                  {
                        path: "/edit/:id",
                        element: <Edit />,
                  },
            ],
      },
      {
            path: "/auth",
            element: <Auth />,
      },
]);
