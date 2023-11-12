import { Tune } from "@mui/icons-material";
import "./profile.css";

import Topbar from "../../components/topbar/Topbar";
import Post from "../../components/post/Post";
import AddPost from "../../components/addPost/AddPost";
import ProfileTop from "../../components/profileTop/ProfileTop";
import ProfileIntro from "../../components/profileIntro/ProfileIntro";
import ProfilePhotos from "../../components/profilePhotos/ProfilePhotos";
import ProfileCard from "../../components/profileCard/ProfileCard";
import ProfileEvents from "../../components/profileEvents/ProfileEvents";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <ProfileTop />
        <div className="profileFeed">
          <div className="profileFeedContainer">
            <div className="profileFeedLeft">
              <ProfileIntro />
              <ProfileCard title="Photos" button="See all photos" link="/orkhanrz/photos">
                <ProfilePhotos />
              </ProfileCard>
              <ProfileCard title="Friends" button="See all friends" link="/orkhanrz/friends"/>
              <ProfileCard title="Life events" button="See all" link="/orkhanrz/events">
                <ProfileEvents />
              </ProfileCard>
            </div>
            <div className="profileFeedRight">
              <AddPost />
              <div className="profileFeedRightHeader card">
                <div className="profileFeedRightHeaderContainer pd-8">
                  <h3>Posts</h3>
                  <div className="profileInfoTopRightBtn">
                    <span className="profileInfoTopRightBtnIcon">
                      <Tune />
                    </span>
                    <span className="profileInfoTopRightBtnText">Filters</span>
                  </div>
                </div>
              </div>
              <div className="profileFeedRightPosts">
                <Post />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
