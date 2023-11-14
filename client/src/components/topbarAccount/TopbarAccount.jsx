import { useContext } from "react";
import { Link } from "react-router-dom";
import "./topbarAccount.css";
import { AuthContext } from "../../context/AuthContext";
import {
  Settings,
  Help,
  DarkMode,
  Feedback,
  Logout,
  ArrowForwardIos,
} from "@mui/icons-material";

export default function TopbarAccount({accountMenu}) {
  const { user: me } = useContext(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className={`topbarAccount card ${accountMenu ? "active" : ""}`}>
      <div className="topbarAccountProfile card">
        <Link to={`/${me.username}`} className="topbarAccountProfileUser">
          <div className="topbarAccountProfileUserImage">
            <img src={process.env.REACT_APP_BACKEND_URL + me.profilePicture} alt="user" />
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
            <p className="topbarAccountMenuItemLeftText">Settings & privacy</p>
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
  );
}
