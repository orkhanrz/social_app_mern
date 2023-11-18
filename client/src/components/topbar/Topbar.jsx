import "./topbar.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import {
  Search,
  Home,
  PeopleOutline,
  OndemandVideo,
  Storefront,
  SportsEsportsOutlined,
  List,
  Message,
  Notifications,
  Person,
  KeyboardBackspace,
} from "@mui/icons-material";

import TopbarAccount from "./topbarAccount/TopbarAccount";
import TopbarNotifications from "./topbarNotifications/TopbarNotifications";

export default function Topbar() {
  const [inputActive, setInputActive] = useState(false);
  const [inputLoading, setInputLoading] = useState(false);
  const [inputData, setInputData] = useState([]);
  const [accountMenu, setAccountMenu] = useState(false);
  const [notificationsMenu, setNotificationsMenu] = useState(false);
  
  const inputRef = useRef();
  const accountMenuRef = useRef();
  const notificationsMenuRef = useRef();

  const searchHandler = async (query) => {
    setInputLoading(true);

    try {
      const res = await axios.post(`/users/search`, { query });
      setInputData(res.data);
      setInputLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      // if (e.target !== accountMenuRef.current) {
      //   setAccountMenu(false);
      // }

      // if (e.target !== notificationsMenuRef.current) {
      //   setNotificationsMenu(false);
      // }

      if (e.target !== inputRef.current) {
        setInputActive(false);
      }
    });
  });

  return (
    <div className="topbar bs">
      <div className="topbarContainer">
        <div className="topbarLeft">
          {!inputActive ? (
            <Link to="/" className="topbarLogo">
              <img src="/assets/icons/logo.svg" alt="logo" />
            </Link>
          ) : (
            <span
              className={`topbarInputWrapperBack ${
                inputActive ? "active" : ""
              }`}
            >
              <KeyboardBackspace />
            </span>
          )}

          <div
            className={`topbarInputWrapper ${inputActive ? "active" : ""}`}
            onClick={() => setInputActive(true)}
          >
            <label htmlFor="search">
              <Search className="searchIcon" />
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Social"
              ref={inputRef}
              onChange={(e) => searchHandler(e.target.value)}
            />
          </div>

          {inputActive && inputData.length ? (
            <div className="topbarSearchBox">
              {inputLoading ? (
                <div className="topbarSearchBoxLoading">
                  <CircularProgress color="inherit" size="26px" />
                </div>
              ) : (
                inputData.map((u) => {
                  return (
                    <Link to={`/${u.username}`} className="topbarSearchBoxItem">
                      <div className="topbarSearchBoxUserImage">
                        <img
                          src={
                            process.env.REACT_APP_BACKEND_URL + u.profilePicture
                          }
                          alt="profile"
                        />
                      </div>
                      <p className="topbarSearchBoxUserName">
                        {u.firstName} {u.lastName}
                      </p>
                    </Link>
                  );
                })
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="topbarCenter">
          <span className="topbarCenterItem active">
            <Home />
          </span>
          <span className="topbarCenterItem">
            <PeopleOutline />
          </span>
          <span className="topbarCenterItem">
            <OndemandVideo />
          </span>
          <span className="topbarCenterItem">
            <Storefront />
          </span>
          <span className="topbarCenterItem">
            <SportsEsportsOutlined />
          </span>
        </div>
        <div className="topbarRight">
          <span className="topbarRightItem">
            <List />
          </span>
          <span className="topbarRightItem">
            <Message />
          </span>
          <span
            className="topbarRightItem"
            onClick={() => setNotificationsMenu(!notificationsMenu)}
            ref={notificationsMenuRef}
          >
            <Notifications />
          </span>
          <span
            className="topbarRightItem"
            onClick={() => setAccountMenu(!accountMenu)}
            ref={accountMenuRef}
          >
            <Person />
          </span>
        </div>
        <TopbarNotifications notificationsMenu={notificationsMenu} />
        <TopbarAccount accountMenu={accountMenu} />
      </div>
    </div>
  );
}
