import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./albums.css";

import { Add, MoreHoriz } from "@mui/icons-material";

import Topbar from "../../components/topbar/Topbar";
import ProfileTop from "../../components/profile/profileTop/ProfileTop";
import Modal from "../../components/modal/Modal";
import AddPostCard from "../../components/addPostCard/AddPostCard";

export default function Albums() {
  const { username } = useParams();
  const { pathname } = useLocation();
  const { results: user } = useLoaderData();

  const [albums, setAlbums] = useState([]);
  const [postCard, setPostCard] = useState(false);
  const [file, setFile] = useState(null);

  const togglePostCard = (e) => {
    if (!postCard) {
      setFile(e.target.files[0]);
    }

    setPostCard(!postCard);
  };

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await axios.get(`/users/${user._id}/albums`);
        setAlbums(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAlbums();
  }, [user]);

  return (
    <>
      <Topbar />
      <ProfileTop />
      <div className="photosPage">
        <div className="photosPageContainer">
          <div className="photosPageTop">
            <h3 className="photosPageTopText">Albums</h3>
            <div className="photosPageTopBtns">
              <label htmlFor="file" className="photosPageTopBtn">
                Add photos/video
              </label>
              <button className="photosPageTopMoreBtn">
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
          <div className="photosPageBottom">
            <div className="photosPageLinks">
              <Link to={`/${username}/photos`} className={`photosPageLink ${ pathname === `/${username}/photos` ? "active" : "" }`}>
                {user.firstName}'s photos
              </Link>
              <Link to={`/${username}/albums`} className={`photosPageLink ${ pathname === `/${username}/albums` ? "active" : "" }`}>
                Albums
              </Link>
            </div>
            <div className="albumItems">
              <div className="albumItem">
                <div className="albumItemImg">
                  <Add />
                </div>
                <div className="albumItemInfo">
                  <h4 className="albumItemInfoName">Create album</h4>
                </div>
              </div>
              {albums.map((a) => {
                return (
                  <div key={a._id} className="albumItem">
                    <div className="albumItemImg">
                      <img
                        src={process.env.REACT_APP_BACKEND_URL + a.albumPicture}
                        alt=""
                      />
                    </div>
                    <div className="albumItemInfo">
                      <h4 className="albumItemInfoName">{a.name}</h4>
                      <p className="albumItemInfoLength">{a.items} Items</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {postCard ? <Modal><AddPostCard file={file} togglePostCard={togglePostCard} /></Modal> : ""}
    </>
  );
}
