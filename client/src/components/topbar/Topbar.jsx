import "./topbar.css";
import { useState } from "react";
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
import TopbarMessenger from "./topbarMessenger/TopbarMessenger";
import MessengerBottom from "../messengerBottom/MessengerBottom";

export default function Topbar() {
  const [inputActive, setInputActive] = useState(false);
  const [inputLoading, setInputLoading] = useState(false);
  const [inputData, setInputData] = useState([]);
  const [accountMenu, setAccountMenu] = useState(false);
  const [notificationsMenu, setNotificationsMenu] = useState(false);
  const [messengerMenu, setMessengerMenu] = useState(false);
  const [messenger, setMessenger] = useState({state: false, user: null, conversationId: ''});

  const toggleMessenger = (state, user, conversationId) => {
    setMessengerMenu(false);
    setMessenger({state, user, conversationId});
  };

  const searchHandler = async (query) => {
    setInputLoading(true);

    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL + `/users/search`, { query });
      setInputData(res.data);
      setInputLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

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
              onClick={() => setInputActive(false)}
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
                      <div className="topbarSearchBoxUserImage" key={u._id}>
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
          <span
            className={`topbarRightItem ${messengerMenu ? "active" : ""}`}
            onClick={() => setMessengerMenu(!messengerMenu)}
          >
            <Message />
          </span>
          <span
            className={`topbarRightItem ${notificationsMenu ? "active" : ""}`}
            onClick={() => setNotificationsMenu(!notificationsMenu)}
          >
            <Notifications />
          </span>
          <span
            className={`topbarRightItem ${accountMenu ? "active" : ""}`}
            onClick={() => setAccountMenu(!accountMenu)}
          >
            <Person />
          </span>
        </div>
        <TopbarMessenger
          messengerMenu={messengerMenu}
          toggleMessenger={toggleMessenger}
        />
        {accountMenu ? <TopbarAccount accountMenu={accountMenu} /> : ""}
        {notificationsMenu ? <TopbarNotifications notificationsMenu={notificationsMenu} /> : ''}
        {messenger.state ? <MessengerBottom messenger={messenger} toggleMessenger={toggleMessenger} /> : ""}
      </div>
    </div>
  );
}
