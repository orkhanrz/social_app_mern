import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./signUpForm.css";

import { Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { days, months, years } from "../../utils/formDates";
import axios from "../../utils/axios";

import { AuthContext } from "../../context/AuthContext";

export default function SignUpForm({ toggleModal }) {
  const navigate = useNavigate();
  const { dispatch, isLoading } = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    dob: {
      month: "1",
      day: "1",
      year: "1905",
    },
    gender: "",
  });

  const handleChange = (e) => {
    setFormErrors((prevState) => ({ ...prevState, [e.target.name]: "" }));
    setForm((prevState) => {
      if (
        e.target.name === "day" ||
        e.target.name === "month" ||
        e.target.name === "year"
      ) {
        return {
          ...prevState,
          dob: { ...prevState.dob, [e.target.name]: e.target.value },
        };
      }
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/signup", form);

      if (res.status === 201) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        navigate("/");
      }
    } catch (err) {
      if (err.response.status === 403) {
        setFormErrors(err.response.data);
      }
      dispatch({ type: "LOGIN_FAIL", error: err });
    }
  };

  return (
    <div className="signUp pd-8">
      <div className="signUpTop">
        <div className="signUpTopLeft">
          <h1 className="signUpTitle">Sign Up</h1>
          <p className="signUpDesc">It's quick and easy.</p>
        </div>
        <div className="signUpTopRight">
          <span className="signUpTopRightIcon" onClick={toggleModal}>
            <Close />
          </span>
        </div>
      </div>
      <hr />
      <div className="signUpBottom">
        <form className="signUpForm" onSubmit={handleSubmit}>
          <div className="formControl formControlFlex">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={formErrors.firstName ? "formError" : ""}
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={formErrors.lastName ? "formError" : ""}
            />
          </div>
          <div className="formControl">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={formErrors.email ? "formError" : ""}
            />
          </div>
          <div className="formControl">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={formErrors.password ? "formError" : ""}
            />
          </div>
          <div className="formControl">
            <label className="formControlLabel">Birthday</label>
            <div className="formControlFlex">
              <select
                name="month"
                value={form.dob.month}
                onChange={handleChange}
              >
                {months.map((month) => {
                  return <option key={`m_${month.value}`} value={month.value}>{month.text}</option>;
                })}
              </select>
              <select name="day" value={form.dob.day} onChange={handleChange}>
                {days(6).map((day) => {
                  return <option key={`d_${day}`} value={day}>{day}</option>;
                })}
              </select>
              <select name="year" value={form.dob.year} onChange={handleChange}>
                {years().map((year) => {
                  return <option key={`y_${year}`} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="formControl">
            <label className="formControlLabel">Gender</label>
            <div className="formControlFlex">
              <div
                className={`formControlCheckbox ${
                  formErrors.gender ? "formError" : ""
                }`}
              >
                <label>Female</label>
                <input
                  type="checkbox"
                  name="gender"
                  value="female"
                  className="formControlCheckboxInput"
                  checked={form.gender === "female"}
                  onChange={handleChange}
                />
              </div>
              <div
                className={`formControlCheckbox ${
                  formErrors.gender ? "formError" : ""
                }`}
              >
                <label>Male</label>
                <input
                  type="checkbox"
                  name="gender"
                  value="male"
                  className="formControlCheckboxInput"
                  checked={form.gender === "male"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <p className="signUpConsent">
            People who use our service may have uploaded your contact
            information to Facebook.{" "}
            <span className="signUpConsentBtn">Learn more.</span>
          </p>
          <p className="signUpConsent">
            By clicking Sign Up, you agree to our{" "}
            <span className="signUpConsentBtn">Terms</span>,{" "}
            <span className="signUpConsentBtn">Privacy Policy</span> and{" "}
            <span className="signUpConsentBtn">Cookies Policy.</span> You may
            receive SMS Notifications from us and can opt out any time.
          </p>
          <button className="signUpFormBtn" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size="22px" /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
