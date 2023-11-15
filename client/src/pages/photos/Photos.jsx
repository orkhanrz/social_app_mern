import "./photos.css";

import Topbar from "../../components/topbar/Topbar";
import ProfileTop from "../../components/profileTop/ProfileTop";
// import { useLoaderData } from "react-router-dom";

export default function Photos() {
  // const { results: user } = useLoaderData();

  return (
    <>
      <Topbar />
      <ProfileTop />
      <div className="photosPage">
        <div className="profileContainer">
          <h1>Photos</h1>
        </div>
      </div>
    </>
  );
}
