import "./feed.css";
import AddStory from "../addStory/AddStory";
import AddPost from "../addPost/AddPost";
import Post from "../post/Post";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedContainer">
        <AddStory />
        <AddPost />
        <div className="posts">
            <Post />
        </div>
      </div>
    </div>
  );
}
