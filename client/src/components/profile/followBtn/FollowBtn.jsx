import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  PersonAdd,
  PersonRemove,
  SubscriptionsOutlined,
} from "@mui/icons-material";

export default function FollowBtn({ user, me }) {
  const [openActions, setOpenActions] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(user.receivedFriendRequests.includes(me._id));
  const [isReceivedRequest, setIsReceivedRequest] = useState(user.sentFriendRequests.includes(me._id));
  const [isFriend, setIsFriend] = useState(user.friends.includes(me._id));
  const [isFollowed, setIsFollowed] = useState(user.followers.includes(me._id));

  const handleFollow = async () => {
    try {
      const res = await axios.post(`/users/${user._id}/follow`, {
        userId: me._id,
      });

      if (res.data.followRequest) {
        setIsFollowed(!isFollowed);
      }

      if (res.data.friendRequest) {
        setIsSentRequest(!isSentRequest);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isFriend) {
    return (
      <button className="profileInfoTopRightBtn blue" onClick={handleFollow}>
        <span className="profileInfoTopRightBtnIcon">
          <PersonRemove />
        </span>
        <span className="profileInfoTopRightBtnText">Remove friend</span>
      </button>
    );
  }

  if (!isFriend && isSentRequest) {
    return (
      <button className="profileInfoTopRightBtn blue" onClick={handleFollow}>
        <span className="profileInfoTopRightBtnIcon">
          <PersonRemove />
        </span>
        <span className="profileInfoTopRightBtnText">Cancel Request</span>
      </button>
    );
  }

  if (!isFriend && isReceivedRequest) {
    return (
      <div className="profileInfoTopRightBtn blue" onClick={handleFollow}>
        <span className="profileInfoTopRightBtnIcon">
          <PersonAdd />
        </span>
        <span className="profileInfoTopRightBtnText" onClick={() => setOpenActions(!openActions)}>Respond</span>
        {openActions ? (
          <div className="friendRequestRespondModal">
            <button className="friendRequestModalConfirm">
              Confirm request
            </button>
            <button className="friendRequestModalReject">Delete request</button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  if (user.private && !isFriend && !isSentRequest && !isReceivedRequest) {
    return (
      <button className="profileInfoTopRightBtn blue" onClick={handleFollow}>
        <span className="profileInfoTopRightBtnIcon">
          <PersonAdd />
        </span>
        <span className="profileInfoTopRightBtnText">Add friend</span>
      </button>
    );
  }

  if (!user.private && isFollowed) {
    return (
      <button className="profileInfoTopRightBtn blue" onClick={handleFollow}>
        <span className="profileInfoTopRightBtnIcon">
          <SubscriptionsOutlined />
        </span>
        <span className="profileInfoTopRightBtnText">Unfollow</span>
      </button>
    );
  }

  if (!user.private && !isFollowed && !isReceivedRequest) {
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
