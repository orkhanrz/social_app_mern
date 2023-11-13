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
} from "@mui/icons-material";

export default function Topbar() {
  const { user: me } = useContext(AuthContext);
  const [accountMenu, setAccountMenu] = useState(false);
  const accountMenuRef = useRef();

  const logoutHandler = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if(e.target !== accountMenuRef.current){
        setAccountMenu(false);
      };
    })
  });

  return (
    <div className="topbar bs">
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" className="topbarLogo">
            <img src="/assets/icons/logo.svg" alt="logo" />
          </Link>
          <div className="topbarInputWrapper">
            <label htmlFor="search">
              <Search className="searchIcon" />
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Social"
            />
          </div>
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
                <img
                  src={process.env.REACT_APP_BACKEND_URL + me.profilePicture}
                  alt="user"
                />
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
            <div className="topbarAccountMenuItem">
              <div className="topbarAccountMenuItemLeft">
                <span className="topbarAccountMenuItemLeftIcon">
                  <Logout />
                </span>
                <p className="topbarAccountMenuItemLeftText" onClick={logoutHandler}>Log Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
