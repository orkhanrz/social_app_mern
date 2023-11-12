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

export default function Post() {
  return (
    <div className="post card">
      <div className="postContainer pd-8">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to='/orkhanrz' className="postTopImg">
              <img src="/assets/icons/profile.png" alt="profile" />
            </Link>
            <div className="postTopDetails">
              <Link to='/orkhanrz' className="postTopUsername">Orkhan Rzali</Link>
              <div className="postTopDate">
                <p className="postTopDateText">20 hours ago</p>
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
          <p className="postCenterText">Happy night sky!! Fairbanks, Alaska</p>
          <div className="postCenterMedia">
            <img src="/assets/images/image1.jpg" alt="" />
          </div>
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
              <p className="postCenterLikesText">507</p>
            </div>
            <div className="postCenterComments">
              <p className="postCenterCommentsComments">16 comments</p>
              <p className="postCenterCommentsShares">36 shares</p>
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
