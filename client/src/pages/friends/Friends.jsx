import { useEffect } from "react";
import { useLoaderData, useLocation, useParams, Link } from "react-router-dom";
import {useCookies} from 'react-cookie';
import axios from "axios";
import "./friends.css";

import { MoreHoriz } from "@mui/icons-material";

import Topbar from "../../components/topbar/Topbar";
import ProfileTop from "../../components/profile/profileTop/ProfileTop";

export default function Photos() {
  const { username } = useParams();
  const { pathname } = useLocation();
  const [cookies] = useCookies();
  const { results: user } = useLoaderData();

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/users/${user._id}/photos`,
          { headers: { Authorization: "Bearer " + cookies.token } }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPhotos();
  }, [user, cookies]);

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
            </div>
          </div>
          <div className="photosPageBottom">
            <div className="photosPageLinks">
              <Link
                to={`/${username}/friends`}
                className={`photosPageLink ${
                  pathname === `/${username}/friends` ? "active" : ""
                }`}
              >
                Friends
              </Link>
              <Link
                to={`/${username}/followings`}
                className={`photosPageLink ${
                  pathname === `/${username}/followings` ? "active" : ""
                }`}
              >
                Following
              </Link>
            </div>
            <div className="photosItems"></div>
          </div>
        </div>
      </div>
    </>
  );
}
