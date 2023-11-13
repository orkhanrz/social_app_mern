import { useContext, useState } from "react";
import "./profileTop.css";

import {
  ExpandMoreOutlined,
  MessageOutlined,
  MoreHorizOutlined,
  SubscriptionsOutlined,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function ProfileTop({ user }) {
  const { user: me } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(user.followers.includes(me._id));

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/users/${user._id}/follow`, {
        userId: me._id,
      });
      setIsLoading(false);

      if (res.status === 200) {
        setIsFollowed(prevState => !prevState);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div className="profileImages">
        <div className="profileCoverImage">
          <img
            src={process.env.REACT_APP_BACKEND_URL + user.coverPicture}
            alt="cover"
          />
        </div>
        <div className="profileUserImage">
          <img
            src={process.env.REACT_APP_BACKEND_URL + user.profilePicture}
            alt="user"
          />
        </div>
      </div>
      <div className="profileInfo">
        <div className="profileContainer">
          <div className="profileInfoTop">
            <div className="profileInfoTopLeft">
              <div className="profileInfoTopLeftImagePlaceholder"></div>
              <div className="profileInfoTopLeftUsername">
                <h1>{user.firstName + " " + user.lastName}</h1>
              </div>
            </div>
            {me.username !== user.username ? (
              <div className="profileInfoTopRight">
                <button
                  disabled={isLoading}
                  className="profileInfoTopRightBtn blue"
                  onClick={handleFollow}
                >
                  {isLoading ? <CircularProgress size={16}/> : 
                    <>
                      <span className="profileInfoTopRightBtnIcon"><SubscriptionsOutlined /></span>
                      <span className="profileInfoTopRightBtnText">
                        {isFollowed ? "Unfollow" : "Follow"}
                      </span>
                    </>
                  }
                </button>
                <button className="profileInfoTopRightBtn">
                  <span className="profileInfoTopRightBtnIcon">
                    <MessageOutlined />
                  </span>
                  <span className="profileInfoTopRightBtnText">Message</span>
                </button>
                <div className="profileInfoTopRightBtn">
                  <span className="profileInfoTopRightBtnIcon">
                    <ExpandMoreOutlined />
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <hr />
          <div className="profileInfoBottom">
            <div className="profileInfoBottomLeft">
              <span className="profileInfoBottomLeftItem active">Posts</span>
              <span className="profileInfoBottomLeftItem">About</span>
              <span className="profileInfoBottomLeftItem">Friends</span>
              <span className="profileInfoBottomLeftItem">Photos</span>
              <span className="profileInfoBottomLeftItem">Videos</span>
            </div>
            <div className="profileInfoBottomRight">
              <button className="profileInfoBottomRightBtn">
                <MoreHorizOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
