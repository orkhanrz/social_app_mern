import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./topbarNotifications.css";

import axios from "../../../utils/axios";
import { MoreHoriz, Notifications } from "@mui/icons-material";
import TimeAgo from "react-timeago";

export default function TopbarNotifications({ notificationsMenu, user }) {
  // const navigate = useNavigate();
  const { user: me } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(`/users/${me._id}/notifications`);

  // const readNotification = async (notificationId) => {
  //   try {
  //     const res = await axios.put(`/users/notifications/${notificationId}`);
  //     setNotifications(res.data);
  //     navigate(`/${res.data.from.username}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fetchNotifications = async (url = process.env.REACT_APP_BACKEND_URL + `/users/${me._id}/notifications`) => {
    setFetchUrl(url);

    try {
      const res = await axios.get(fetchUrl);
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  });

  return (
    <div className={`notifications card ${notificationsMenu ? "active" : ""}`}>
      <div className="notificationContainer pd-8">
        <div className="notificationTop">
          <h2 className="notificationTopTitle">Notifications</h2>
          <span className="notificationTopBtn">
            <MoreHoriz />
          </span>
        </div>
        <div className="notificationBtns">
          <span
            className={`notificationBtn ${
              fetchUrl === `/users/${me._id}/notifications` ? "active" : ""
            }`}
            onClick={() => fetchNotifications()}
          >
            All
          </span>
          <span
            className={`notificationBtn ${
              fetchUrl === process.env.REACT_APP_BACKEND_URL + `/users/${me._id}/notifications?read=false`
                ? "active"
                : ""
            }`}
            onClick={() =>
              fetchNotifications(process.env.REACT_APP_BACKEND_URL + `/users/${me._id}/notifications?read=false`)
            }
          >
            Unread
          </span>
        </div>
        <div className="notificationItems">
          {notifications.map((n) => {
            return (
              <Link to={`/${n.from.username}`} className="notificationItem" key={n._id}>
                <div className="notificationItemImg">
                  <img src="/assets/images/image1.jpg" alt="profile" />
                  <span className="notificationItemImgIcon">
                    <Notifications />
                  </span>
                </div>
                <div className="notificationDetails">
                  <p className="notificationMessage">
                    {n.message}{" "}
                    <span className="notificationFrom">
                      {n.from.firstName} {n.from.lastName}
                    </span>
                  </p>
                  <span className="notificationDate">
                    <TimeAgo date={n.date} />
                  </span>
                </div>
                {!n.read ? <span className="notificationRight"></span> : ""}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
