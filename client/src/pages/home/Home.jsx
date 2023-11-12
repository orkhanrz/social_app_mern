import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import "./home.css";

import React from "react";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="home">
        <Leftbar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
