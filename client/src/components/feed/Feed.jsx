import "./feed.css";
import AddStory from "../addStory/AddStory";
import AddPost from "../addPost/AddPost";
import Post from "../post/Post";

export default function Feed({ posts }) {
  return (
    <div className="feed">
      <div className="feedContainer">
        <AddStory />
        <AddPost />
        <div className="posts">
          {posts?.map((post) => <Post post={post} user={post.userId} key={post._id} />)}
        </div>
      </div>
    </div>
  );
}
