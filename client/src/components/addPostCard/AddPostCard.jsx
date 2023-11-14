import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Close,
  Collections,
  ExpandMore,
  GifBox,
  LocationOn,
  Lock,
  MoreHoriz,
  Person,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import "./addPostCard.css";
import axios from "axios";

export default function AddPostCard({ togglePostCard, inputRef }) {
  const { user } = useContext(AuthContext);
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);
  const text = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text.current.value);
    formData.append("userId", user._id);

    if (media) {
      formData.append("media", media);
    }

    try {
      const res = await axios.post("/posts", formData);
      if (res.status === 201) {
        window.location.reload();
      }
    } catch (err) {
      if (err.response.status === 403) {
        setError(err.response.data.text);
      }
    }
  };

  useEffect(() => {
    text.current.focus();
  }, []);

  return (
    <div className="addPostCardContainer pd-8">
      <div className="addPostCardTop">
        <h3 className="addPostCardTitle">Create post</h3>
        <span className="addPostCardClose" onClick={togglePostCard}>
          <Close />
        </span>
      </div>
      <hr />
      <div className="addPostCardCenter">
        <div className="addPostCardUser">
          <div className="addPostCardUserImage">
            <img src={process.env.REACT_APP_BACKEND_URL + user.profilePicture} alt="profile" />
          </div>
          <div className="addPostCardUserDetails">
            <p className="addPostCardUsername">
              {user.firstName + " " + user.lastName}
            </p>
            <div className="addPostCardVisibility">
              <span className="addPostCardVisibilityIcon">
                <Lock />
              </span>
              <p className="addPostCardVisibilityText">Only me</p>
              <span className="addPostCardVisibilityIcon">
                <ExpandMore />
              </span>
            </div>
          </div>
        </div>
        <div className="addPostCardInputWrapper">
          <input
            name="text"
            placeholder={`What's on your mind, ${user.firstName}?`}
            ref={text}
            className={error ? "formError" : ""}
            onInput={() => setError(null)}
          />
          <input
            type="file"
            className="addPostCardInput"
            id="file"
            onChange={(e) => setMedia(e.target.files[0])}
          />
          <div className="addPostCardEmotionIcon">
            <SentimentVerySatisfied />
          </div>
        </div>
        {media ? (
          <div className="addPostCardImageWrapper">
            <div className="addPostCardImage">
              <img src={URL.createObjectURL(media)} alt="post" />
            </div>
            <div
              className="addPostCardImageClose"
              onClick={() => setMedia(null)}
            >
              <Close />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="addPostCardBottom">
          <p className="addPostCardBottomText">Add to your post</p>
          <div className="addPostCardBottomIcons">
            <span className="addPostCardBottomIcon green">
              <label htmlFor="file">
                <Collections />
              </label>
            </span>
            <span className="addPostCardBottomIcon blue">
              <Person />
            </span>
            <span className="addPostCardBottomIcon yellow">
              <SentimentVerySatisfied />
            </span>
            <span className="addPostCardBottomIcon red">
              <LocationOn />
            </span>
            <span className="addPostCardBottomIcon gray">
              <GifBox />
            </span>
            <span className="addPostCardBottomIcon">
              <MoreHoriz />
            </span>
          </div>
        </div>
        <button className="addPostCardBtn" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}
