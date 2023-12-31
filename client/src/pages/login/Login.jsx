import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./login.css";

import { CircularProgress } from "@mui/material";

import SignUpForm from "../../components/signUpForm/SignUpForm";
import Modal from "../../components/modal/Modal";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch, isLoading } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormErrors((prevState) => ({ ...prevState, [e.target.name]: "" }));
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/auth/login",
        form,
        {withCredentials: true}
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response.status === 403) {
        setFormErrors(err.response.data);
      }
      dispatch({ type: "LOGIN_FAIL", error: err });
    }
  };

  const toggleModal = (e) => {
    e.preventDefault();

    setModal(!modal);
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginLeft">
          <div className="loginTitle">social</div>
          <div className="loginText">
            Connect with friends and the world around you on Social.
          </div>
        </div>
        <div className="loginRight">
          <div className="loginFormContainer card">
            <form className="loginForm pd-8" onSubmit={handleSubmit}>
              <div className="formControl">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                  value={form.email}
                  onChange={handleChange}
                  className={`${formErrors.email ? "formError" : ""}`}
                />
              </div>
              <div className="formControl">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  value={form.password}
                  onChange={handleChange}
                  className={`${formErrors.password ? "formError" : ""}`}
                />
              </div>
              <button className="loginBtn" type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress size="22px" /> : "Log In"}
              </button>
              <p className="forgotPassword">Forgot password?</p>
              <hr />
              <button className="createAccountBtn" onClick={toggleModal}>
                Create new account
              </button>
            </form>
          </div>
        </div>

        {modal ? (
          <Modal>
            <SignUpForm toggleModal={toggleModal} />
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
