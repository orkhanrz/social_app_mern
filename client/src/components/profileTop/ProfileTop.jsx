import { useContext, useState } from "react";
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { config } from "../../config";
import axios from "axios";
import "./profileTop.css";

import {
  Add,
  Edit,
  ExpandMoreOutlined,
  MessageOutlined,
  MoreHorizOutlined,
  SubscriptionsOutlined,
} from "@mui/icons-material";

import EditProfile from "../../components/editProfile/EditProfile";
import Modal from "../../components/modal/Modal";

export default function ProfileTop() {
  const { pathname } = useLocation();
  const { username } = useParams();
  const { user: me } = useContext(AuthContext);
  const { results: user } = useLoaderData();
  const [editProfile, setEditProfile] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    user?.followers.includes(me._id)
  );

  const toggleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  const handleFollow = async () => {
    try {
      const res = await axios.post(`/users/${user._id}/follow`, {
        userId: me._id,
      });

      if (res.status === 200) {
        setIsFollowed((prevState) => !prevState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return user ? (
    <>
      <div className="profileImages">
        <div className="profileCoverImage">
          <img src={config.backend_url + user.coverPicture} alt="cover" />
        </div>
        <div className="profileUserImage">
          <img src={config.backend_url + user.profilePicture} alt="user" />
        </div>
      </div>
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
                className="profileInfoTopRightBtn blue"
                onClick={handleFollow}
              >
                <>
                  <span className="profileInfoTopRightBtnIcon">
                    <SubscriptionsOutlined />
                  </span>
                  <span className="profileInfoTopRightBtnText">
                    {isFollowed ? "Unfollow" : "Follow"}
                  </span>
                </>
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
            <div className="profileInfoTopRight">
              <button className="profileInfoTopRightBtn blue">
                <span className="profileInfoTopRightBtnIcon">
                  <Add />
                </span>
                <span className="profileInfoTopRightBtnText">Add to story</span>
              </button>
              <button
                className="profileInfoTopRightBtn"
                onClick={toggleEditProfile}
              >
                <span className="profileInfoTopRightBtnIcon">
                  <Edit />
                </span>
                <span className="profileInfoTopRightBtnText">Edit profile</span>
              </button>
              <div className="profileInfoTopRightBtn">
                <span className="profileInfoTopRightBtnIcon">
                  <ExpandMoreOutlined />
                </span>
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="profileInfoBottom">
          <div className="profileInfoBottomLeft">
            <Link
              to={`/${username}`}
              className={`profileInfoBottomLeftItem ${
                pathname === `/${username}` ? "active" : ""
              }`}
            >
              Posts
            </Link>
            <span
              className={`profileInfoBottomLeftItem ${
                pathname === `/${username}/about` ? "active" : ""
              }`}
            >
              About
            </span>
            <span
              className={`profileInfoBottomLeftItem ${
                pathname === `/${username}/friends` ? "active" : ""
              }`}
            >
              Friends
            </span>
            <Link
              to={`/${username}/photos`}
              className={`profileInfoBottomLeftItem ${
                pathname === `/${username}/photos` ? "active" : ""
              }`}
            >
              Photos
            </Link>
            <span
              className={`profileInfoBottomLeftItem ${
                pathname === `/${username}/videos` ? "active" : ""
              }`}
            >
              Videos
            </span>
          </div>
          <div className="profileInfoBottomRight">
            <button className="profileInfoBottomRightBtn">
              <MoreHorizOutlined />
            </button>
          </div>
        </div>
      </div>
      {editProfile ? (
        <Modal>
          <EditProfile toggleEditProfile={toggleEditProfile} />
        </Modal>
      ) : (
        ""
      )}
    </>
  ) : (
    ""
  );
}
