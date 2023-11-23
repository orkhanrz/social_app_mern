import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  VideoCameraFront,
  PermMedia,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import "./addPost.css";

import AddPostCard from "../addPostCard/AddPostCard";
import Modal from "../modal/Modal";

export default function AddPost() {
  const { user: me } = useContext(AuthContext);
  const [postCard, setPostCard] = useState(false);

  const togglePostCard = () => {
    setPostCard(!postCard);
  };

  return (
    <div className="addPost card">
      <div className="addPostContainer">
        <div className="addPostTop pd-8">
          <Link to={`/${me.username}`} className="addPostTopIcon">
            <img
              src={process.env.REACT_APP_BACKEND_PUBLIC_URL + me.profilePicture}
              alt="profile"
            />
          </Link>
          <input
            type="text"
            placeholder={`What's on your mind, ${
              me.username.charAt(0).toUpperCase() + me.username.slice(1)
            }?`}
            onClick={togglePostCard}
            disabled={postCard}
          />
        </div>
        <hr className="addPostLine" />
        <div className="addPostBottom">
          <div className="addPostBottomItem" onClick={togglePostCard}>
            <span className="addPostBottomItemIcon addPostVideoIcon">
              <VideoCameraFront />
            </span>
            <p className="addPostItemDesc">Live video</p>
          </div>
          <div className="addPostBottomItem" onClick={togglePostCard}>
            <span className="addPostBottomItemIcon addPostMediaIcon">
              <PermMedia />
            </span>
            <p className="addPostItemDesc">Photo/video</p>
          </div>
          <div className="addPostBottomItem" onClick={togglePostCard}>
            <span className="addPostBottomItemIcon addPostSmileIcon">
              <SentimentVerySatisfied />
            </span>
            <p className="addPostItemDesc">Feeling/activity</p>
          </div>
        </div>
      </div>
      {postCard ? (
        <Modal>
          <AddPostCard togglePostCard={togglePostCard} />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
