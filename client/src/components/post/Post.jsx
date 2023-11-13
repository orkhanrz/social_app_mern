import { Link } from "react-router-dom";
import "./post.css";
import {
  Public,
  ThumbUpOutlined,
  CommentOutlined,
  IosShareOutlined,
  MoreHorizOutlined,
  CloseOutlined
} from "@mui/icons-material";

import {format} from 'timeago.js';

export default function Post({post, user}) {
  return (
    <div className="post card">
      <div className="postContainer pd-8">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/${user.username}`} className="postTopImg">
              <img src={process.env.REACT_APP_BACKEND_URL + user.profilePicture} alt="profile" />
            </Link>
            <div className="postTopDetails">
              <Link to={`/${user.username}`} className="postTopUsername">{user.firstName + ' ' + user.lastName}</Link>
              <div className="postTopDate">
                <p className="postTopDateText">{format(post.date)}</p>
                <span className="postTopDateIcon">
                  <Public />
                </span>
              </div>
            </div>
          </div>
          <div className="postTopRight">
            <span className="postTopRightIcon"><MoreHorizOutlined /></span>
            <span className="postTopRightIcon"><CloseOutlined /></span>
          </div>
        </div>
        <div className="postCenter">
          <p className="postCenterText">{post.text}</p>
          {post.media && <div className="postCenterMedia">
            <img src={process.env.REACT_APP_BACKEND_URL + post.media} alt="" />
          </div>}
          
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
              <p className="postCenterLikesText">{post.likes.length}</p>
            </div>
            <div className="postCenterComments">
              <p className="postCenterCommentsComments">{post.comments.length} comments</p>
              <p className="postCenterCommentsShares">{post.shares.length} shares</p>
            </div>
          </div>
        </div>
        <hr className="postLine" />
        <div className="postBottom">
          <div className="postBottomItem">
            <span className="postBottomItemIcon">
              <ThumbUpOutlined />
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
