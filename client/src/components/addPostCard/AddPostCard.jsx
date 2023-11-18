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
import { CircularProgress } from "@mui/material";

export default function AddPostCard({ togglePostCard, file }) {
  const { user } = useContext(AuthContext);
  const [media, setMedia] = useState(file);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const text = useRef();

  console.log(media);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("text", text.current.value);
    formData.append("userId", user._id);

    if (media) {
      formData.append("media", media);
    }

    try {
      const res = await axios.post("/posts", formData);
      setLoading(false);
      if (res.status === 201) {
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
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
            <img
              src={process.env.REACT_APP_BACKEND_URL + user.profilePicture}
              alt="profile"
            />
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
            accept=".png, .jpg, .jpeg, .mp4"
          />
          <div className="addPostCardEmotionIcon">
            <SentimentVerySatisfied />
          </div>
        </div>
        {media ? (
          <div className="addPostCardImageWrapper">
            <div className="addPostCardImage">
              {media.type.includes("image") ? (
                <img src={URL.createObjectURL(media)} alt="post" />
              ) : (
                <video src={URL.createObjectURL(media)} alt="post" controls autoPlay/>
              )}
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
        <button
          className="addPostCardBtn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {!loading ? "Post" : <CircularProgress size="22px" />}
        </button>
      </div>
    </div>
  );
}
