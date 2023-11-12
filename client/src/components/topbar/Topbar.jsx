import "./topbar.css";

import { Link } from "react-router-dom";
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
  Person
} from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="topbar bs">
      <div className="topbarLeft">
        <Link to='/' className="topbarLogo">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
          />
        </Link>
        <div className="topbarInputWrapper">
          <label htmlFor="search"><Search className="searchIcon" /></label>
          <input type="text" name="search" id="search" placeholder="Search Social" />
        </div>
      </div>
      <div className="topbarCenter">
        <span className="topbarCenterItem active"><Home/></span>
        <span className="topbarCenterItem"><PeopleOutline/></span>
        <span className="topbarCenterItem"><OndemandVideo/></span>
        <span className="topbarCenterItem"><Storefront/></span>
        <span className="topbarCenterItem"><SportsEsportsOutlined/></span>
      </div>
      <div className="topbarRight">
        <span className="topbarRightItem"><List /></span>
        <span className="topbarRightItem"><Message /></span>
        <span className="topbarRightItem"><Notifications /></span>
        <span className="topbarRightItem"><Person /></span>
      </div>
    </div>
  );
}
