import "./notificationItem.css";
import { useNavigate } from "react-router-dom";
import TimeAgo from "react-timeago";
import axios from "axios";

import { Notifications } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function NotificationItem({ item }) {
  const { user: me } = useContext(AuthContext);
  const [isRead, setIsRead] = useState(item.read);
  const navigate = useNavigate();

  const readNotification = async (item) => {
    try {
      await axios.put(`/users/${me._id}/notifications/${item._id}`);
      setIsRead(true);
      navigate(`/${item.from.username}`, {replace: true});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="notificationItem"
      key={item._id}
      onClick={() => readNotification(item)}
    >
      <div className="notificationItemImg">
        <img src="/assets/images/image1.jpg" alt="profile" />
        <span className="notificationItemImgIcon">
          <Notifications />
        </span>
      </div>
      <div className="notificationDetails">
        <p className="notificationMessage">
          {item.message}{" "}
          <span className="notificationFrom">
            {item.from.firstName} {item.from.lastName}
          </span>
        </p>
        <span className="notificationDate">
          <TimeAgo date={item.date} />
        </span>
      </div>
      {!isRead ? <span className="notificationRight"></span> : ""}
    </div>
  );
}
