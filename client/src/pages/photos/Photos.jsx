import "./photos.css";

import Topbar from "../../components/topbar/Topbar";
import ProfileTop from "../../components/profileTop/ProfileTop";
import ProfileCard from "../../components/profileCard/ProfileCard";
import { useLoaderData, useLocation, useParams, Link } from "react-router-dom";

export default function Photos() {
  const { username } = useParams();
  const { pathname } = useLocation();
  const { results: user } = useLoaderData();

  return (
    <>
      <Topbar />
      <ProfileTop />
      <div className="photosPage">
        <div className="profileContainer">
          <ProfileCard title="Photos">
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
              <div className="photosItem">
                <img className="photosItemImg" src="/assets/images/image1.jpg" alt="" />
              </div>
              <div className="photosItem">
                <img className="photosItemImg" src="/assets/images/image1.jpg" alt="" />
              </div>
              <div className="photosItem">
                <img className="photosItemImg" src="/assets/images/image1.jpg" alt="" />
              </div>
              <div className="photosItem">
                <img className="photosItemImg" src="/assets/images/image1.jpg" alt="" />
              </div>
              <div className="photosItem">
                <img className="photosItemImg" src="/assets/images/image1.jpg" alt="" />
              </div>
            </div>
          </ProfileCard>
        </div>
      </div>
    </>
  );
}
