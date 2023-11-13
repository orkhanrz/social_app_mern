import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

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
import EditProfile from '../../components/editProfile/EditProfile';
import Modal from "../../components/modal/Modal";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const { user: me } = useContext(AuthContext);

  const toggleEditProfile = () => {
    setEditProfile(!editProfile);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${username}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/users/${user?._id}/posts`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    user && fetchPosts();
  }, [user]);

  return (
    <>
      <Topbar />
      {user ? (
        <div className="profile">
          <ProfileTop user={user} toggleEditProfile={toggleEditProfile}/>
          <div className="profileFeed">
            <div className="profileFeedContainer">
              <div className="profileFeedLeft">
                <ProfileIntro user={user} />
                <ProfileCard
                  title="Photos"
                  button="See all photos"
                  link={`/${user.username}/photos`}
                >
                  <ProfilePhotos />
                </ProfileCard>
                <ProfileCard
                  title="Friends"
                  button="See all friends"
                  link={`/${user.username}/friends`}
                />
                {user.events.length ? (
                  <ProfileCard
                    title="Life events"
                    button="See all"
                    link={`/${user.username}/events`}
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
                      <span className="profileInfoTopRightBtnText">
                        Filters
                      </span>
                    </div>
                  </div>
                </div>
                <div className="profileFeedRightPosts">
                  {posts.length
                    ? posts.map((post) => {
                        return <Post user={user} post={post} key={post._id} />;
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
          {editProfile ? (
            <Modal>
              <EditProfile toggleEditProfile={toggleEditProfile}/>
            </Modal>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
