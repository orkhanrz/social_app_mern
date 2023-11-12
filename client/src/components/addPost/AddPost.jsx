import "./addPost.css";
import {useState} from 'react';

import {VideoCameraFront, PermMedia, SentimentVerySatisfied} from '@mui/icons-material';
import Modal from '../modal/Modal';
import AddPostCard from '../addPostCard/AddPostCard';

export default function AddPost() {
  const [postCard, setPostCard] = useState(false);

  const togglePostCard = () => {
    setPostCard(!postCard);
  };

  return (
    <div className="addPost card">
      <div className="addPostContainer">
        <div className="addPostTop pd-8">
          <div className="addPostTopIcon">
            <img src="/assets/icons/profile.png" alt="profile" />
          </div>
          <input type="text" placeholder="What's on your mind, Orkhan?"  onClick={togglePostCard}/>
        </div>
        <hr className="addPostLine"/>
        <div className="addPostBottom">
          <div className="addPostBottomItem">
            <span className="addPostBottomItemIcon addPostVideoIcon"><VideoCameraFront /></span>
            <p className="addPostItemDesc">Live video</p>
          </div>
          <div className="addPostBottomItem">
            <span className="addPostBottomItemIcon addPostMediaIcon"><PermMedia /></span>
            <p className="addPostItemDesc" onClick={togglePostCard}>Photo/video</p>
          </div>
          <div className="addPostBottomItem">
            <span className="addPostBottomItemIcon addPostSmileIcon"><SentimentVerySatisfied /></span>
            <p className="addPostItemDesc" onClick={togglePostCard}>Feeling/activity</p>
          </div>
        </div>
      </div>
      {postCard ? <Modal><AddPostCard togglePostCard={togglePostCard}/></Modal> : ''}
    </div>
  );
}
