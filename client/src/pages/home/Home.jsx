import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

export default function Home() {
  const {user: me} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/users/${me._id}/feed`);
        
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
