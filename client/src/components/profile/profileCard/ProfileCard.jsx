import "./profileCard.css";
import { Link } from "react-router-dom";

export default function ProfileCard({ title, button, link, children }) {
  return (
    <div className="profileCard card">
      <div className="profileCardContainer pd-8">
        <div
          className="profileCardTop"
          style={children && { marginBottom: "8px"}}
        >
          <Link to={link} className="profileCardTitle">
            {title}
          </Link>
          <Link to={link} className="profileCardBtn">
            {button}
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
