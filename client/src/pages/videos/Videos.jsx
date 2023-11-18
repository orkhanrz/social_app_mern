import {  useEffect, useState } from "react";
import { useLoaderData, useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";

import Topbar from "../../components/topbar/Topbar";
import ProfileTop from "../../components/profile/profileTop/ProfileTop";
import Modal from "../../components/modal/Modal";
import AddPostCard from "../../components/addPostCard/AddPostCard";

import { MoreHoriz } from "@mui/icons-material";

export default function Videos() {
  const { username } = useParams();
  const { pathname } = useLocation();
  const { results: user } = useLoaderData();
  const [videos, setVideos] = useState([]);
  const [postCard, setPostCard] = useState(false);
  const [file, setFile] = useState(null);

  const togglePostCard = (e) => {
    if (!postCard) {
      setFile(e.target.files[0]);
    }

    setPostCard(!postCard);
  };

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await axios.get(`/users/${user._id}/videos`);
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchVideos();
  }, [user]);

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
                accept=".mp4"
              />
            </div>
          </div>
          <div className="photosPageBottom">
            <div className="photosPageLinks">
              <Link
                to={`/${username}/videos`}
                className={`photosPageLink ${
                  pathname === `/${username}/videos` ? "active" : ""
                }`}
              >
                {user.firstName}'s videos
              </Link>
            </div>
            <div className="photosItems">
              {videos?.map((v) => {
                return (
                  <div key={v._id} className="photosItem">
                    <div className="photosItemImg">
                      <video
                        src={process.env.REACT_APP_BACKEND_URL + v}
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