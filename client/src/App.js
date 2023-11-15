import {
  defer,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Photos from "./pages/photos/Photos";
import axios from "axios";
import Protected from "./pages/protected/Protected";

function App() {
  const userLoader = async ({ username }) => {
    const res = await axios.get(`/users/${username}`);
    return defer({ results: res.data });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected><Home /></Protected>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/:username",
      element: <Protected><Profile /></Protected>,
      loader: ({ request, params }) => userLoader(params),
    },
    {
      path: "/:username/photos",
      element: <Protected><Photos /></Protected>,
      loader: ({ request, params }) => userLoader(params),
    },
  ]);

  return <RouterProvider router={router}/>
}

export default App;
