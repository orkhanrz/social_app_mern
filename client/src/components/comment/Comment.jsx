import { useContext, useEffect, useState } from "react";
import "./comment.css";

import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Close, MoreHoriz, ThumbUp } from "@mui/icons-material";
import ReactTimeago from "react-timeago";
import CommentInput from "../commentInput/CommentInput";
import Modal from "../modal/Modal";


export default function Comment({ comment, postId, setComments }) {
  const { user: me } = useContext(AuthContext);
  const [likes, setLikes] = useState({
    length: comment.likes.length,
    isLiked: comment.likes.includes(me._id),
  });
  const [commentData, setCommentData] = useState(comment);
  const [commentOptions, setCommentOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const { className } = e.target;

      if (
        className !== "commentEditOption" &&
        className !== "postCommentsItemOptions" &&
        className !== "postCommentInput"
      ) {
        setCommentOptions(false);
        setEditMode(false);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        setCommentOptions(false);
        setEditMode(false);
      }
    });
  });

  const deleteComment = async () => {
    try {
      const res = await axios.delete(
        `/posts/${postId}/comments/${commentData._id}?userId=${me._id}`
      );
      setComments(res.data);
      setDeleteModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const likeComment = async () => {
    try {
      await axios.post(`/posts/${postId}/comments/${commentData._id}/like`, {
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

  return !editMode ? (
    <div className="postCommentsItem">
      <div className="postCommentsItemLeft">
        <img
          className="postCommentsItemUserImage"
          src={
            process.env.REACT_APP_BACKEND_URL +
            commentData.userId.profilePicture
          }
          alt="profile"
        />
      </div>
      <div className="postCommentsItemRight">
        <div className="postCommentsItemRightTop">
          <h4 className="postCommentsItemUsername">
            {commentData.userId.firstName} {commentData.userId.lastName}
          </h4>
          <p className="postCommentsItemText">{commentData.text}</p>
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
        <div className="postCommentsItemRightBottom">
          <span className="postCommentsItemDate"><ReactTimeago date={commentData.date} /></span>
          <span
            className={`postCommentsItemAction ${likes.isLiked ? "blue" : ""}`}
            onClick={likeComment}
          >
            Like
          </span>
          <span className="postCommentsItemAction">Reply</span>
          <span className="postCommentsItemAction">Share</span>
        </div>
        {deleteModal ? (
          <Modal>
            <div className="deleteContainer">
              <div className="deleteHeader">
                <h3 className="deleteHeaderText">Delete Comment?</h3>
                <span
                  className="deleteClose"
                  onClick={() => setDeleteModal(false)}
                >
                  <Close />
                </span>
              </div>
              <div className="deleteMain">
                <p className="deleteMainText">
                  Are you sure you want to delete this comment?
                </p>
              </div>
              <div className="deleteActions">
                <button
                  className="deleteActionsSecondary"
                  onClick={() => setDeleteModal(false)}
                >
                  No
                </button>
                <button
                  className="deleteActionsPrimary"
                  onClick={deleteComment}
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
      </div>
      {commentData.userId._id === me._id ? (
        <span
          className="postCommentsItemOptions"
          onClick={() => setCommentOptions(true)}
        >
          <MoreHoriz />
        </span>
      ) : (
        ""
      )}
      {commentOptions ? (
        <div className="commentOptions">
          <button
            className="commentEditOption"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <button
            className="commentDeleteOption"
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <CommentInput
      postId={postId}
      comment={commentData}
      setCommentData={setCommentData}
      editMode={true}
    />
  );
}
