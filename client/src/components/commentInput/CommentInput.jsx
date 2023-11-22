import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./commentInput.css";
import axios from "../../utils/axios";

import {
  Mood,
  SentimentSatisfied,
  CameraAltOutlined,
  GifOutlined,
  CopyAll,
  Send,
} from "@mui/icons-material";

export default function CommentInput({postId, comment, editMode, setComments, setCommentData}) {
  const { user: me } = useContext(AuthContext);
  const [input, setInput] = useState({ isActive: editMode, text: '' });

  const editComment = async () => {
    try {
      const res = await axios.put(`/posts/${postId}/comments/${comment._id}`, {text: input.text, userId: me._id});
      setInput({isActive: false, text: ''});
      setCommentData(prevState => ({...prevState, text: res.data.text, date: res.data.date}));
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async () => {
    try {
      const res = await axios.post(`/posts/${postId}/comments/`, {text: input.text, userId: me._id});
      setInput({isActive: false, text: ''});
      setComments(prevState => ([...prevState, {...res.data, userId: me}]));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    <div className="postComment" onClick={() => setInput((prevState) => ({ ...prevState, isActive: true })) } >
      <div className="postCommentUserImg">
        <img
          src={process.env.REACT_APP_BACKEND_PUBLIC_URL + me.profilePicture}
          alt="profile"
        />
      </div>
      <div className={`postCommentInputWrapper ${ input.isActive ? "active" : "" }`} >
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Write a comment..."
          value={input.text}
          onChange={(e) =>
            setInput((prevState) => ({
              ...prevState,
              text: e.target.value,
            }))
          }
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
            disabled={!input.text.length}
            className="postCommentInputCommentIcon"
            onClick={editMode ? editComment : addComment}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
    {editMode ? <p className="commentCancel">Press esc to <span>cancel.</span></p> : ''}
    </>
  );
}
