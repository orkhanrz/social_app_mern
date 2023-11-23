import { useState } from "react";
import { useLoaderData, useLocation, useParams, Link } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import "./photos.css";

import { MoreHoriz } from "@mui/icons-material";

import Topbar from "../../components/topbar/Topbar";
import ProfileTop from "../../components/profile/profileTop/ProfileTop";
import Modal from "../../components/modal/Modal";
import AddPostCard from "../../components/addPostCard/AddPostCard";

export default function Photos() {
  const { results: user } = useLoaderData();
  const { username } = useParams();
  const { pathname } = useLocation();
  const [postCard, setPostCard] = useState(false);
  const [file, setFile] = useState(null);
  const {data: photos} = useFetch(`/users/${user._id}/photos`);

  const togglePostCard = (e) => {
    if (!postCard) {
      setFile(e.target.files[0]);
    }

    setPostCard(!postCard);
  };

  return (
    <>
      <Topbar />
      <ProfileTop />
      <div className="photosPage">
        <div className="photosPageContainer">
          <div className="photosPageTop">
            <h3 className="photosPageTopText">Photos</h3>
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
              <Link
                to={`/${username}/photos`}
                className={`photosPageLink ${
                  pathname === `/${username}/photos` ? "active" : ""
                }`}
              >
                {user.firstName}'s photos
              </Link>
              <Link
                to={`/${username}/albums`}
                className={`photosPageLink ${
                  pathname === `/${username}/albums` ? "active" : ""
                }`}
              >
                Albums
              </Link>
            </div>
            <div className="photosItems">
              {photos?.map((p) => {
                return (
                  <div key={p._id} className="photosItem">
                    <div className="photosItemImg">
                      <img
                        src={process.env.REACT_APP_BACKEND_PUBLIC_URL + p.url}
                        alt=""
                      />
                    </div>
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
