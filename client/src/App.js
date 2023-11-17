import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import userLoader from "./utils/userLoader";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Photos from "./pages/photos/Photos";
import Videos from "./pages/videos/Videos";
import Albums from "./pages/albums/Albums";
import Friends from './pages/friends/Friends';
import Protected from "./pages/protected/Protected";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Home />
        </Protected>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/:username",
      element: (
        <Protected>
          <Profile />
        </Protected>
      ),
      loader: userLoader,
    },
    {
      path: "/:username/photos",
      element: (
        <Protected>
          <Photos />
        </Protected>
      ),
      loader: userLoader,
    },
    {
      path: "/:username/albums",
      element: (
        <Protected>
          <Albums />
        </Protected>
      ),
      loader: userLoader,
    },
    {
      path: "/:username/videos",
      element: (
        <Protected>
          <Videos />
        </Protected>
      ),
      loader: userLoader,
    },
    {
      path: "/:username/friends",
      element: (
        <Protected>
          <Friends />
        </Protected>
      ),
      loader: userLoader,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
