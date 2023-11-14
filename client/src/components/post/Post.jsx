import { useContext, useState } from "react";
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
  Mood,
  SentimentSatisfied,
  CameraAltOutlined,
  GifOutlined,
  CopyAll,
  Send,
} from "@mui/icons-material";
import axios from "axios";
import { config } from "../../config";

import TimeAgo from "react-timeago";

export default function Post({ post, user }) {
  const { user: me } = useContext(AuthContext);
  const [likes, setLikes] = useState({
    length: post.likes.length,
    isLiked: post.likes.includes(me._id),
  });
  const [comments, setComments] = useState({
    length: post.comments.length,
    isActive: false,
    text: ''
  });

  const postComment = async () => {
    try {
      await axios.post(`/posts/${post._id}/comment`, {userId: me._id, text: comments.text});
      setComments(prevState => ({length: prevState.length + 1, isActive: false, text: ''}));
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
            <span className="postTopRightIcon">
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
              <p className="postCenterCommentsComments">
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
            <span className={`postBottomItemIcon ${likes.isLiked ? "active" : ""}`}>
              <ThumbUp />
            </span>
            <p className="postBottomItemText">Like</p>
          </div>
          <div className="postBottomItem">
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
        {!comments.length ? (
          <div className="postComment" onClick={() => setComments(prevState => ({...prevState, isActive: true}))}>
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
                onChange={(e) => setComments(prevState => ({...prevState, text: e.target.value}))}
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
