import { useContext, useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
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
  const { user: me } = useContext(AuthContext);
  const { results: user } = useLoaderData();
  const {data: posts} = useFetch(`/users/${user._id}/posts`);
  const {data: photos} = useFetch(`/users/${user._id}/photos`);

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
                {posts?.map((post) => <Post user={user} post={post} key={post._id} />)}
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
