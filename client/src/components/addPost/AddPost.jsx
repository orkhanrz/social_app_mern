import "./addPost.css";

import {VideoCameraFront, PermMedia, SentimentVerySatisfied} from '@mui/icons-material';

export default function AddPost() {
  return (
    <div className="addPost card">
      <div className="addPostContainer">
        <div className="addPostTop pd-8">
          <div className="addPostTopIcon">
            <img src="/assets/icons/profile.png" alt="profile" />
          </div>
          <input type="text" placeholder="What's on your mind, Orkhan?" />
        </div>
        <hr className="addPostLine"/>
        <div className="addPostBottom">
          <div className="addPostBottomItem">
            <span className="addPostBottomItemIcon addPostVideoIcon"><VideoCameraFront /></span>
            <p className="addPostItemDesc">Live video</p>
          </div>
          <div className="addPostBottomItem">
            <span className="addPostBottomItemIcon addPostMediaIcon"><PermMedia /></span>
            <p className="addPostItemDesc">Photo/video</p>
          </div>
          <div className="addPostBottomItem">
            <span className="addPostBottomItemIcon addPostSmileIcon"><SentimentVerySatisfied /></span>
            <p className="addPostItemDesc">Feeling/activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
