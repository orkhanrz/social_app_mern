import "./profileTop.css";

import {
  ExpandMoreOutlined,
  MessageOutlined,
  MoreHorizOutlined,
  SubscriptionsOutlined,
} from "@mui/icons-material";

export default function ProfileTop() {
  return (
    <>
      <div className="profileImages">
        <div className="profileCoverImage">
          <img src="/assets/images/image1.jpg" alt="cover" />
        </div>
        <div className="profileUserImage">
          <img src="/assets/images/image1.jpg" alt="user" />
        </div>
      </div>
      <div className="profileInfo">
        <div className="profileContainer">
          <div className="profileInfoTop">
            <div className="profileInfoTopLeft">
              <div className="profileInfoTopLeftImagePlaceholder"></div>
              <div className="profileInfoTopLeftUsername">
                <h1>Mark Zuckerberg</h1>
              </div>
            </div>
            <div className="profileInfoTopRight">
              <div className="profileInfoTopRightBtn blue">
                <span className="profileInfoTopRightBtnIcon">
                  <SubscriptionsOutlined />
                </span>
                <span className="profileInfoTopRightBtnText">Follow</span>
              </div>
              <div className="profileInfoTopRightBtn">
                <span className="profileInfoTopRightBtnIcon">
                  <MessageOutlined />
                </span>
                <span className="profileInfoTopRightBtnText">Message</span>
              </div>
              <div className="profileInfoTopRightBtn">
                <span className="profileInfoTopRightBtnIcon">
                  <ExpandMoreOutlined />
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className="profileInfoBottom">
            <div className="profileInfoBottomLeft">
              <span className="profileInfoBottomLeftItem active">Posts</span>
              <span className="profileInfoBottomLeftItem">About</span>
              <span className="profileInfoBottomLeftItem">Friends</span>
              <span className="profileInfoBottomLeftItem">Photos</span>
              <span className="profileInfoBottomLeftItem">Videos</span>
            </div>
            <div className="profileInfoBottomRight">
              <button className="profileInfoBottomRightBtn">
                <MoreHorizOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
