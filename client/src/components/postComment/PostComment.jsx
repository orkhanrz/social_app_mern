import { useContext, useEffect, useState } from "react";
import "./postComment.css";

import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { MoreHoriz, ThumbUp } from "@mui/icons-material";

export default function PostComment({ comment, postId }) {
  const { user: me } = useContext(AuthContext);
  const [likes, setLikes] = useState({
    length: comment.likes.length,
    isLiked: comment.likes.includes(me._id),
  });
  const [commentOptions, setCommentOptions] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const { className } = e.target;

      if (
        className !== "commentEditOption" &&
        className !== "commentDeleteOption" &&
        className !== "postCommentsItemOptions"
      ) {
        setCommentOptions(false);
      }
    });
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
        {commentOptions ? (
          <div className="commentOptions">
            <button className="commentEditOption">Edit</button>
            <button className="commentDeleteOption">Delete</button>
          </div>
        ) : (
          ""
        )}
      </div>
      {comment.userId._id === me._id ? (
        <span
          className="postCommentsItemOptions"
          onClick={() => setCommentOptions(true)}
        >
          <MoreHoriz />
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
