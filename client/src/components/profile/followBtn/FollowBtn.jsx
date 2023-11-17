import React, { useState } from "react";
import axios from "axios";

import {
  PersonAdd,
  PersonRemove,
  SubscriptionsOutlined,
} from "@mui/icons-material";

export default function FollowBtn({ user, me }) {
  const [isFollowed, setIsFollowed] = useState(
    user?.followers.includes(me._id)
  );

  const handleFollow = async () => {
    try {
      const res = await axios.post(`/users/${user._id}/follow`, {
        userId: me._id,
      });

      if (res.status === 200) {
        setIsFollowed((prevState) => !prevState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (user.private) {
    if (user.friends.includes(me._id)) {
      return (
        <button className="profileInfoTopRightBtn blue" onClick={handleFollow}>
          <span className="profileInfoTopRightBtnIcon">
            <PersonRemove />
          </span>
          <span className="profileInfoTopRightBtnText">Remove friend</span>
        </button>
      );
    } else {
      return (
        <button className="profileInfoTopRightBtn blue" onClick={handleFollow}>
          <span className="profileInfoTopRightBtnIcon">
            <PersonAdd />
          </span>
          <span className="profileInfoTopRightBtnText">Add friend</span>
        </button>
      );
    }
  } else {
    if (isFollowed) {
      return (
        <button className="profileInfoTopRightBtn blue" onClick={handleFollow}>
          <span className="profileInfoTopRightBtnIcon">
            <SubscriptionsOutlined />
          </span>
          <span className="profileInfoTopRightBtnText">Unfollow</span>
        </button>
      );
    } else {
      return (
        <button className="profileInfoTopRightBtn blue" onClick={handleFollow}>
          <span className="profileInfoTopRightBtnIcon">
            <SubscriptionsOutlined />
          </span>
          <span className="profileInfoTopRightBtnText">Follow</span>
        </button>
      );
    }
  }
}
