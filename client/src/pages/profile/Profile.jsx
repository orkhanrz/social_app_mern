import { useContext, useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCookies } from "react-cookie";
import axios from "../../utils/axios";
import "./profile.css";

import { Tune } from "@mui/icons-material";

import Topbar from "../../components/topbar/Topbar";
import Post from "../../components/post/Post";
import AddPost from "../../components/addPost/AddPost";
import ProfileTop from "../../components/profile/profileTop/ProfileTop";
import ProfileIntro from "../../components/profile/profileIntro/ProfileIntro";
import ProfilePhotos from "../../components/profile/profilePhotos/ProfilePhotos";
import ProfileCard from "../../components/profile/profileCard/ProfileCard";
import ProfileEvents from "../../components/profile/profileEvents/ProfileEvents";

export default function Profile() {
  const { username } = useParams();
  const [cookies] = useCookies();
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { user: me } = useContext(AuthContext);
  const { results: user } = useLoaderData();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/users/${user?._id}/posts`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPhotos = async () => {
      try {
        const res = await axios.get(`/users/${user?._id}/photos`);
        setPhotos(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    user && fetchPosts() && fetchPhotos();
  }, [user, cookies]);

  return (
    <>
      <Topbar />
      <ProfileTop />
      {user ? (
        <div className="profilePage">
          <div className="profilePageContainer">
            <div className="profileFeedLeft">
              <ProfileIntro user={user} />
              <ProfileCard
                title="Photos"
                button="See all photos"
                link={`/${username}/photos`}
              >
                <ProfilePhotos photos={photos} />
              </ProfileCard>
              <ProfileCard
                title="Friends"
                button="See all friends"
                link={`/${username}/friends`}
              />
              {user.events.length ? (
                <ProfileCard
                  title="Life events"
                  button="See all"
                  link={`/${username}/events`}
                >
                  <ProfileEvents />
                </ProfileCard>
              ) : (
                ""
              )}
            </div>
            <div className="profileFeedRight">
              {user._id === me._id ? <AddPost /> : ""}

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
                {posts.length
                  ? posts.map((post) => (
                      <Post user={user} post={post} key={post._id} />
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
