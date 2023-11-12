import "./addStory.css";

import { Add } from "@mui/icons-material";

export default function AddStory() {
  return (
    <div className="createStory card">
      <div className="createStoryContainer pd-8">
        <div className="createStoryLeft">
          <span className="createStoryIcon">
            <Add />
          </span>
        </div>
        <div className="createStoryRight">
          <h3 className="createStoryTitle">Create story</h3>
          <p className="createStoryDesc">Share a photo or write something.</p>
        </div>
      </div>
    </div>
  );
}
