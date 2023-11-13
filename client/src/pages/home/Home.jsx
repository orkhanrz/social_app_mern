import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import "./home.css";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const {user: me} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(`/users/${me._id}/feed`);
        
        setPosts(res.data);
      } catch (err){
        console.log(err);
      };
    };

    getFeed();
  }, [me]);

  return (
    <>
      <Topbar />
      <div className="home">
        <Leftbar />
        <Feed posts={posts}/>
        <Rightbar />
      </div>
    </>
  );
}
