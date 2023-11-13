import "./topbar.css";
import { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
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
  Settings,
  Help,
  DarkMode,
  Feedback,
  Logout,
  ArrowForwardIos,
  KeyboardBackspace,
} from "@mui/icons-material";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { config } from "../../config";

console.log(config.backend_url);

export default function Topbar() {
  const { user: me } = useContext(AuthContext);
  const [accountMenu, setAccountMenu] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [inputLoading, setInputLoading] = useState(false);
  const [inputData, setInputData] = useState([]);
  const accountMenuRef = useRef();
  const inputRef = useRef();

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

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target !== accountMenuRef.current) {
        setAccountMenu(false);
      }

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
                          src={config.backend_url + u.profilePicture}
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
          <span className="topbarRightItem">
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
        <div className={`topbarAccount card ${accountMenu ? "active" : ""}`}>
          <div className="topbarAccountProfile card">
            <Link to={`/${me.username}`} className="topbarAccountProfileUser">
              <div className="topbarAccountProfileUserImage">
                <img src={config.backend_url + me.profilePicture} alt="user" />
              </div>
              <h3 className="topbarAccountProfileUsername">
                {me.firstName + " " + me.lastName}
              </h3>
            </Link>
            <hr />
            <p className="topbarAccountProfileUserText">See all profiles</p>
          </div>

          <div className="topbarAccountMenuItems">
            <div className="topbarAccountMenuItem">
              <div className="topbarAccountMenuItemLeft">
                <span className="topbarAccountMenuItemLeftIcon">
                  <Settings />
                </span>
                <p className="topbarAccountMenuItemLeftText">
                  Settings & privacy
                </p>
              </div>
              <span className="topbarAccountMenuItemRightIcon">
                <ArrowForwardIos />
              </span>
            </div>
            <div className="topbarAccountMenuItem">
              <div className="topbarAccountMenuItemLeft">
                <span className="topbarAccountMenuItemLeftIcon">
                  <Help />
                </span>
                <p className="topbarAccountMenuItemLeftText">Help & support</p>
              </div>
              <span className="topbarAccountMenuItemRightIcon">
                <ArrowForwardIos />
              </span>
            </div>
            <div className="topbarAccountMenuItem">
              <div className="topbarAccountMenuItemLeft">
                <span className="topbarAccountMenuItemLeftIcon">
                  <DarkMode />
                </span>
                <p className="topbarAccountMenuItemLeftText">
                  Display & accessibility
                </p>
              </div>
              <span className="topbarAccountMenuItemRightIcon">
                <ArrowForwardIos />
              </span>
            </div>
            <div className="topbarAccountMenuItem">
              <div className="topbarAccountMenuItemLeft">
                <span className="topbarAccountMenuItemLeftIcon">
                  <Feedback />
                </span>
                <p className="topbarAccountMenuItemLeftText">Give feedback</p>
              </div>
            </div>
            <div className="topbarAccountMenuItem" onClick={logoutHandler}>
              <div className="topbarAccountMenuItemLeft">
                <span className="topbarAccountMenuItemLeftIcon">
                  <Logout />
                </span>
                <p className="topbarAccountMenuItemLeftText">Log Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
