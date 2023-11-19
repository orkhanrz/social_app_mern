import React, { useState } from "react";

import {
  PersonAdd,
  PersonRemove,
  SubscriptionsOutlined,
} from "@mui/icons-material";

export default function FollowBtn({
  user,
  isSentRequest,
  isReceivedRequest,
  isFriend,
  isFollowed,
  respondRequest,
  removeFriend,
  handleFollow,
}) {
  const [openActions, setOpenActions] = useState(false);

  if (isFriend) {
    return (
      <button className="profileInfoTopRightBtn blue" onClick={removeFriend}>
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
      <div className="profileInfoTopRightBtn blue">
        <span className="profileInfoTopRightBtnIcon">
          <PersonAdd />
        </span>
        <span
          className="profileInfoTopRightBtnText"
          onClick={() => setOpenActions(!openActions)}
        >
          Respond
        </span>
        {openActions ? (
          <div className="friendRequestRespondModal">
            <button
              className="friendRequestModalConfirm"
              onClick={() => respondRequest(true)}
            >
              Confirm request
            </button>
            <button
              className="friendRequestModalReject"
              onClick={() => respondRequest(false)}
            >
              Delete request
            </button>
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
