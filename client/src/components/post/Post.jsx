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
} from "@mui/icons-material";
import axios from "axios";
import {config} from '../../config';

import TimeAgo from "react-timeago";

export default function Post({ post, user }) {
  const { user: me } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(me._id));

  const likePost = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: me._id });
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post card">
      <div className="postContainer pd-8">
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
              <img
                src={config.backend_url + post.media}
                alt=""
              />
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
              <p className="postCenterLikesText">{likes}</p>
            </div>
            <div className="postCenterComments">
              <p className="postCenterCommentsComments">
                {post.comments.length} comments
              </p>
              <p className="postCenterCommentsShares">
                {post.shares.length} shares
              </p>
            </div>
          </div>
        </div>
        <hr className="postLine" />
        <div className="postBottom">
          <div className="postBottomItem" onClick={likePost}>
            <span className={`postBottomItemIcon ${isLiked ? "active" : ""}`}>
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
      </div>
    </div>
  );
}
