import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./index.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={!user ? <Login /> : <Home />}></Route>
          <Route path="/login" element={!user ? <Login /> : <Home />}></Route>
          <Route
            path="/:profile"
            element={!user ? <Login /> : <Profile />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
