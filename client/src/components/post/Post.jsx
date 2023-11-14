import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./post.css";
import {
  Public,
  CommentOutlined,
  IosShareOutlined,
  MoreHorizOutlined,
  CloseOutlined,
  ThumbUp,
} from "@mui/icons-material";
import axios from "axios";
import { config } from "../../config";

import TimeAgo from "react-timeago";
import Modal from "../modal/Modal";
import PostComment from "../postComment/PostComment";
import { CircularProgress } from "@mui/material";
import PostCommentInput from "../postCommentInput/PostCommentInput";

const PostModal = ({
  post,
  user,
  closeModal,
  comments,
  setComments,
  postComment,
}) => {
  useEffect(() => {
    const getCommentItems = async () => {
      try {
        const res = await axios.get(`/posts/${post._id}/comments`);
        setComments((prevState) => ({ ...prevState, data: res.data }));
      } catch (err) {
        console.log(err);
      }
    };

    getCommentItems();
  }, [setComments, post]);

  return (
    <Modal>
      <div className="postModalContainer">
        <Post
          post={post}
          user={user}
          closeModal={closeModal}
          hideInput={true}
        />
        <div className="postComments">
          {comments.data.length ? (
            comments.data.map((comment) => {
              return (
                <PostComment
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                />
              );
            })
          ) : ""}
        </div>
        <PostCommentInput
          setComments={setComments}
          postComment={postComment}
          comments={comments}
        />
      </div>
    </Modal>
  );
};

function Post({ post, user, closeModal, hideInput }) {
  const { user: me } = useContext(AuthContext);
  const [openPostComments, setOpenPostComments] = useState(false);
  const [likes, setLikes] = useState({
    length: post.likes.length,
    isLiked: post.likes.includes(me._id),
  });
  const [comments, setComments] = useState({
    data: [],
    length: post.comments.length,
    isActive: false,
    text: "",
  });

  const postComment = async () => {
    try {
      const res = await axios.post(`/posts/${post._id}/comments`, {
        userId: me._id,
        text: comments.text,
      });

      setComments((prevState) => ({
        data: [...prevState.data, { ...res.data, userId: me }],
        length: prevState.length + 1,
        isActive: false,
        text: "",
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const likePost = async () => {
    try {
      await axios.post(`/posts/${post._id}/like`, { userId: me._id });
      setLikes((prevState) => ({
        isLiked: !prevState.isLiked,
        length: prevState.isLiked
          ? prevState.isLiked - 1
          : prevState.isLiked + 1,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post card">
      <div className="postContainer">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/${user.username}`} className="postTopImg">
              <img
                src={config.backend_url + user.profilePicture}
                alt="profile"
              />
            </Link>
            <div className="postTopDetails">
              <Link to={`/${user.username}`} className="postTopUsername">
                {user.firstName + " " + user.lastName}
              </Link>
              <div className="postTopDate">
                <p className="postTopDateText">
                  <TimeAgo date={post.date} />
                </p>
                <span className="postTopDateIcon">
                  <Public />
                </span>
              </div>
            </div>
          </div>
          <div className="postTopRight">
            <span className="postTopRightIcon">
              <MoreHorizOutlined />
            </span>
            <span
              className="postTopRightIcon"
              onClick={closeModal && closeModal}
            >
              <CloseOutlined />
            </span>
          </div>
        </div>
        <div className="postCenter">
          <p className="postCenterText">{post.text}</p>
          {post.media && (
            <div className="postCenterMedia">
              <img src={config.backend_url + post.media} alt="" />
            </div>
          )}

          <div className="postCenterDetails">
            <div className="postCenterLikes">
              <div className="postCenterLikesIcons">
                <div className="postCenterLikesIcon">
                  <img src="/assets/icons/thumb.png" alt="thumb" />
                </div>
                <div className="postCenterLikesIcon">
                  <img src="/assets/icons/heart.png" alt="heart" />
                </div>
              </div>
              <p className="postCenterLikesText">{likes.length}</p>
            </div>
            <div className="postCenterComments">
              <p
                className="postCenterCommentsComments"
                onClick={() => setOpenPostComments(true)}
              >
                {comments.length} comments
              </p>
              <p className="postCenterCommentsShares">
                {post.shares.length} shares
              </p>
            </div>
          </div>
        </div>
        <div className="postBottom">
          <div className="postBottomItem" onClick={likePost}>
            <span
              className={`postBottomItemIcon ${likes.isLiked ? "active" : ""}`}
            >
              <ThumbUp />
            </span>
            <p className="postBottomItemText">Like</p>
          </div>
          <div
            className="postBottomItem"
            onClick={() => setOpenPostComments(true)}
          >
            <span className="postBottomItemIcon">
              <CommentOutlined />
            </span>
            <p className="postBottomItemText">Comment</p>
          </div>
          <div className="postBottomItem">
            <span className="postBottomItemIcon">
              <IosShareOutlined />
            </span>
            <p className="postBottomItemText">Share</p>
          </div>
        </div>
        {(hideInput || comments.length) ? (
          ""
        ) : (
          <PostCommentInput
            setComments={setComments}
            postComment={postComment}
            comments={comments}
          />
        )}
      </div>
      {openPostComments ? (
        <PostModal
          post={post}
          user={post.userId}
          closeModal={() => setOpenPostComments(false)}
          setComments={setComments}
          postComment={postComment}
          comments={comments}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Post;
