import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./postCommentInput.css";

import {
  Mood,
  SentimentSatisfied,
  CameraAltOutlined,
  GifOutlined,
  CopyAll,
  Send,
} from "@mui/icons-material";

export default function PostCommentInput({setComments, comments, postComment}) {
  const { user: me } = useContext(AuthContext);

  return (
    <div
      className="postComment"
      onClick={() =>
        setComments((prevState) => ({ ...prevState, isActive: true }))
      }
    >
      <div className="postCommentUserImg">
        <img
          src={process.env.REACT_APP_BACKEND_URL + me.profilePicture}
          alt="profile"
        />
      </div>
      <div
        className={`postCommentInputWrapper ${
          comments.isActive ? "active" : ""
        }`}
      >
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Write a comment..."
          value={comments.text}
          onChange={(e) =>
            setComments((prevState) => ({
              ...prevState,
              text: e.target.value,
            }))
          }
          className="postCommentInput"
        />
        <div className="postCommentInputIcons">
          <div className="postCommentInputIconsLeft">
            <span className="postCommentInputIconsLeftIcon">
              <Mood />
            </span>
            <span className="postCommentInputIconsLeftIcon">
              <SentimentSatisfied />
            </span>
            <span className="postCommentInputIconsLeftIcon">
              <CameraAltOutlined />
            </span>
            <span className="postCommentInputIconsLeftIcon">
              <GifOutlined />
            </span>
            <span className="postCommentInputIconsLeftIcon">
              <CopyAll />
            </span>
          </div>
          <button
            disabled={!comments.text.length}
            className="postCommentInputCommentIcon"
            onClick={postComment}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
