import { Link } from "react-router-dom";
import "./leftbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Leftbar() {
  const {user} = useContext(AuthContext);

  return (
    <div className="leftbar">
      <div className="leftbarItem">
        <span className="leftbarItemIcon uncoloured">
          <img src={process.env.REACT_APP_BACKEND_URL + user.profilePicture} alt="profile" />
        </span>
        <Link to={`/${user.username}`} className="leftbarItemTitle">{user.firstName} {user.lastName}</Link>
      </div>
      <div className="leftbarItem">
        <span className="leftbarItemIcon">
          <img src="/assets/icons/friends.png" alt="friends" />
        </span>
        <p className="leftbarItemTitle">Find Friends</p>
      </div>
      <div className="leftbarItem">
        <span className="leftbarItemIcon">
          <img src="/assets/icons/memories.png" alt="memories" />
        </span>
        <p className="leftbarItemTitle">Memories</p>
      </div>
      <div className="leftbarItem">
        <span className="leftbarItemIcon">
          <img src="/assets/icons/groups.png" alt="groups" />
        </span>
        <p className="leftbarItemTitle">Groups</p>
      </div>
      <div className="leftbarItem">
        <span className="leftbarItemIcon">
          <img src="/assets/icons/video.png" alt="video" />
        </span>
        <p className="leftbarItemTitle">Video</p>
      </div>
      <div className="leftbarItem">
        <span className="leftbarItemIcon">
          <img src="/assets/icons/marketplace.png" alt="marketplace" />
        </span>
        <p className="leftbarItemTitle">Marketplace</p>
      </div>
      <div className="leftbarItem">
        <span className="leftbarItemIcon">
          <img src="/assets/icons/games.png" alt="games" />
        </span>
        <p className="leftbarItemTitle">Play Games</p>
      </div>
    </div>
  );
}
