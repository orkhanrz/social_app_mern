import { useState } from "react";
import "./feed.css";
import AddStory from "../addStory/AddStory";
import AddPost from "../addPost/AddPost";
import Post from "../post/Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  return (
    <div className="feed">
      <div className="feedContainer">
        <AddStory />
        <AddPost />
        <div className="posts">
          {posts.length ? posts.map(post => {
            <Post post={post} key={post._id}/>
          }) : ''}
        </div>
      </div>
    </div>
  );
}
