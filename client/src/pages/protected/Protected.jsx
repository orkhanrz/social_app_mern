import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import Login from "../login/Login";

export default function Protected({children}) {
  const { user } = useContext(AuthContext);

  return user ? children : <Login />;
}
