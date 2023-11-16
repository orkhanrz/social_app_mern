import "./photos.css";

import Topbar from "../../components/topbar/Topbar";
import ProfileTop from "../../components/profileTop/ProfileTop";
import Modal from "../../components/modal/Modal";
import AddPostCard from "../../components/addPostCard/AddPostCard";
import { useLoaderData, useLocation, useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { MoreHoriz } from "@mui/icons-material";

export default function Photos() {
  const { username } = useParams();
  const { pathname } = useLocation();
  const { user: me } = useContext(AuthContext);
  const { results: user } = useLoaderData();
  const [photos, setPhotos] = useState([]);
  const [postCard, setPostCard] = useState(false);
  const [file, setFile] = useState(null);

  const togglePostCard = (e) => {
    if (!postCard) {
      setFile(e.target.files[0]);
    }

    setPostCard(!postCard);
  };

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await axios.get(`/users/${user._id}/photos`);
        console.log(res.data);
        setPhotos(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPhotos();
  }, [user]);

  return (
    <>
      <Topbar />
      <ProfileTop />
      <div className="photosPage">
        <div className="photosPageContainer card">
          <div className="profilePhotosTop">
            <h3 className="profilePhotosTopText">Photos</h3>
            <div className="profilePhotosTopBtns">
              <label htmlFor="file" className="profilePhotosTopBtn">
                Add photos/video
              </label>
              <button className="profileInfoBottomRightBtn">
                <MoreHoriz />
              </button>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={togglePostCard}
                accept=".png, .jpg, .jpg"
              />
            </div>
          </div>
          <div className="profilePhotos">
            <div className="profileLinks">
              <Link
                to={`/${username}/photos`}
                className={`profileLink ${
                  pathname === `/${username}/photos` ? "active" : ""
                }`}
              >
                {user.firstName}'s photos
              </Link>
              <Link
                to={`/${username}/albums`}
                className={`profileLink ${
                  pathname === `/${username}/albums` ? "active" : ""
                }`}
              >
                Albums
              </Link>
            </div>
            <div className="photosItems">
              {photos.map((p) => {
                return (
                  <div key={p._id} className="photosItem">
                    <img
                      className="photosItemImg"
                      src={process.env.REACT_APP_BACKEND_URL + p.url}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {postCard ? (
        <Modal>
          <AddPostCard file={file} togglePostCard={togglePostCard} />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
