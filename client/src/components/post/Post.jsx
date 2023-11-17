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
import Comment from "../comment/Comment";
import CommentInput from "../commentInput/CommentInput";

function PostModal({ post, user, closeModal, comments, setComments }) {
  return (
    <Modal>
      <div className="postModalContainer">
        <Post
          post={post}
          user={user}
          hideInput={true}
          closeModal={closeModal}
        />
        <div className="postComments">
          {comments.length
            ? comments.map((comment) => {
                return (
                  <Comment
                    key={comment._id}
                    postId={post._id}
                    comment={comment}
                    setComments={setComments}
                  />
                );
              })
            : ""}
        </div>
        <CommentInput postId={post._id} setComments={setComments} />
      </div>
    </Modal>
  );
}

function Post({ post, user, hideInput, closeModal }) {  
  const { user: me } = useContext(AuthContext);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [likes, setLikes] = useState({
    isLiked: post.likes.includes(me._id),
    length: post.likes.length,
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getCommentItems = async () => {
      try {
        const res = await axios.get(`/posts/${post._id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getCommentItems();
  }, [post]);

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
                src={process.env.REACT_APP_BACKEND_URL + user.profilePicture}
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
            <span className="postTopRightIcon" onClick={closeModal}>
              <CloseOutlined />
            </span>
          </div>
        </div>
        <div className="postCenter">
          <p className="postCenterText">{post.text}</p>
          {post.media &&
            (post.media.mediaType === "image" ? (
              <div className="postCenterMedia">
                <img src={config.backend_url + post.media.url} alt="" />
              </div>
            ) : (
              <div className="postCenterMedia">
                <video src={config.backend_url + post.media.url} alt="" controls/>
              </div>
            ))}

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
                onClick={() => setOpenPostModal(true)}
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
          <button className="postBottomItem" onClick={likePost}>
            <span
              className={`postBottomItemIcon ${likes.isLiked ? "active" : ""}`}
            >
              <ThumbUp />
            </span>
            <p className="postBottomItemText">Like</p>
          </button>
          <button
            className="postBottomItem"
            onClick={() =>
              !openPostModal ? setOpenPostModal(true) : closeModal()
            }
          >
            <span className="postBottomItemIcon">
              <CommentOutlined />
            </span>
            <p className="postBottomItemText">Comment</p>
          </button>
          <button className="postBottomItem">
            <span className="postBottomItemIcon">
              <IosShareOutlined />
            </span>
            <p className="postBottomItemText">Share</p>
          </button>
        </div>
        {hideInput || comments.length ? (
          ""
        ) : (
          <CommentInput postId={post._id} setComments={setComments} />
        )}
      </div>
      {openPostModal ? (
        <PostModal
          post={post}
          user={user}
          comments={comments}
          setComments={setComments}
          closeModal={() => setOpenPostModal(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Post;
