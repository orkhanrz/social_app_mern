import { useContext, useEffect, useState } from "react";
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import "./profileTop.css";

import {
  Add,
  Edit,
  ExpandMoreOutlined,
  MessageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

import EditProfile from "../editProfile/EditProfile";
import Modal from "../../modal/Modal";
import FollowBtn from "../followBtn/FollowBtn";

export default function ProfileTop() {
  const { pathname } = useLocation();
  const { username } = useParams();
  const { results: user } = useLoaderData();
  const { user: me } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(user.receivedFriendRequests.includes(me._id));
  const [isReceivedRequest, setIsReceivedRequest] = useState(user.sentFriendRequests.includes(me._id));
  const [isFriend, setIsFriend] = useState(user.friends.includes(me._id));
  const [isFollowed, setIsFollowed] = useState(user.followers.includes(me._id));

  useEffect(() => {
    setIsSentRequest(user.receivedFriendRequests.includes(me._id));
    setIsReceivedRequest(user.sentFriendRequests.includes(me._id));
    setIsFriend(user.friends.includes(me._id));
    setIsFollowed(user.followers.includes(me._id));
  }, [user, me]);

  const respondRequest = async (accept) => {
    try {
      await axios.post(`/users/${user._id}/respond_request`, { userId: me._id, accept: accept });
      setIsReceivedRequest(false);
      setIsFriend(accept);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFriend = async () => {
    try {
      await axios.post(`/users/${user._id}/remove_friend`, { userId: me._id })
      setIsReceivedRequest(false);
      setIsFriend(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
      const res = await axios.post(`/users/${user._id}/follow`, { userId: me._id });

      if (res.data.followRequest) {
        setIsFollowed(!isFollowed);
      }

      if (res.data.friendRequest) {
        setIsSentRequest(!isSentRequest);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return user ? (
    <>
      <div className="profileImages">
        <div className="profileCoverImage">
          <img src={process.env.REACT_APP_BACKEND_URL + user.coverPicture} alt="cover" />
        </div>
        <div className="profileUserImage">
          <img src={process.env.REACT_APP_BACKEND_URL + user.profilePicture} alt="user" />
        </div>
      </div>
      <div className="profileInfo">
        <div className="profileInfoContainer">
          <div className="profileInfoTop">
            <div className="profileInfoTopLeft">
              <div className="profileInfoTopLeftImagePlaceholder"></div>
              <div className="profileInfoTopLeftUsername">
                <h1>{user.firstName + " " + user.lastName}</h1>
              </div>
            </div>
            {me.username !== user.username ? (
              <div className="profileInfoTopRight">
                <FollowBtn
                  user={user}
                  isSentRequest={isSentRequest}
                  isReceivedRequest={isReceivedRequest}
                  isFriend={isFriend}
                  isFollowed={isFollowed}
                  respondRequest={respondRequest}
                  removeFriend={removeFriend}
                  handleFollow={handleFollow}
                />

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
                  <span className="profileInfoTopRightBtnText">
                    Add to story
                  </span>
                </button>
                <button className="profileInfoTopRightBtn" onClick={toggleEditProfile}>
                  <span className="profileInfoTopRightBtnIcon">
                    <Edit />
                  </span>
                  <span className="profileInfoTopRightBtnText">
                    Edit profile
                  </span>
                </button>
                <div className="profileInfoTopRightBtn">
                  <span className="profileInfoTopRightBtnIcon">
                    <ExpandMoreOutlined />
                  </span>
                </div>
              </div>
            )}
          </div>
          {isReceivedRequest ? (
            <div className="profileInfoFriendRequest">
              <h3 className="profileInfoFriendRequestMessage">
                {user.firstName} sent you a friend request
              </h3>
              <div className="profileInfoFriendRequestActions">
                <button className="profileInfoFriendRequestAccept" onClick={() => respondRequest(true)}>
                  Confirm request
                </button>
                <button className="profileInfoFriendRequestDecline" onClick={() => respondRequest(false)}>
                  Delete request
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <hr />
          <div className="profileInfoBottom">
            <div className="profileLinks">
              <Link to={`/${username}`} className={`profileLink ${ pathname === `/${username}` ? "active" : "" }`}>
                Posts
              </Link>
              <span className={`profileLink ${ pathname === `/${username}/about` ? "active" : "" }`}>
                About
              </span>
              <Link to={`/${username}/friends`} className={`profileLink ${ pathname === `/${username}/friends` ? "active" : "" }`}>
                Friends
              </Link>
              <Link to={`/${username}/photos`} className={`profileLink ${ pathname === `/${username}/photos` ? "active" : "" }`}>
                Photos
              </Link>
              <Link to={`/${username}/videos`} className={`profileLink ${ pathname === `/${username}/videos` ? "active" : "" }`}>
                Videos
              </Link>
            </div>
            <div className="profileInfoBottomRight">
              <button className="profileInfoBottomRightBtn">
                <MoreHorizOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
      {editProfile ? <Modal><EditProfile toggleEditProfile={toggleEditProfile} /></Modal> : ""}
    </>
  ) : (
    ""
  );
}
