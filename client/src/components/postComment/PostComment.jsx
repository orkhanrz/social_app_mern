import { useContext, useState } from "react";
import "./postComment.css";

import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ThumbUp } from "@mui/icons-material";

export default function PostComment({ comment, postId }) {
  const { user: me } = useContext(AuthContext);
  const [likes, setLikes] = useState({
    length: comment.likes.length,
    isLiked: comment.likes.includes(me._id),
  });

  const likeComment = async () => {
    try {
      await axios.post(`/posts/${postId}/comments/${comment._id}/like`, {
        userId: me._id,
      });
      setLikes((prevState) => ({
        isLiked: !prevState.isLiked,
        length: prevState.isLiked ? prevState.length - 1 : prevState.length + 1,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="postCommentsItem">
      <div className="postCommentsItemLeft">
        <img
          className="postCommentsItemUserImage"
          src={
            process.env.REACT_APP_BACKEND_URL + comment.userId.profilePicture
          }
          alt="profile"
        />
      </div>
      <div className="postCommentsItemRight">
        <div className="postCommentsItemRightTop">
          <h4 className="postCommentsItemUsername">
            {comment.userId.firstName} {comment.userId.lastName}
          </h4>
          <p className="postCommentsItemText">{comment.text}</p>
        </div>
        <div className="postCommentsItemRightBottom">
          <span className="postCommentsItemDate">5d</span>
          <span
            className={`postCommentsItemAction ${likes.isLiked ? "blue" : ""}`}
            onClick={likeComment}
          >
            Like
          </span>
          <span className="postCommentsItemAction">Reply</span>
          <span className="postCommentsItemAction">Share</span>
        </div>
        {likes.length ? (
          <div className="postCommentsItemLikesCount">
            <span className="postCommentsItemLikesCountIcon">
              <ThumbUp />
            </span>
            <p className="postCommentsItemLikesCountText">{likes.length}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
