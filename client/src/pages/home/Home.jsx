import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./home.css";

import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Home() {
  const { user: me } = useContext(AuthContext);
  const { data: posts } = useFetch(`/users/${me._id}/feed`);

  return (
    <>
      <Topbar />
      <div className="home">
        <Leftbar />
        <Feed posts={posts} />
        <Rightbar />
      </div>
    </>
  );
}
