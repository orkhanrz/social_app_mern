import React from "react";
import './conversation.css';

export default function Conversation({conversation, toggleMessenger, user}) {
  return (
    <div
      className="topbarMessengerConversation"
      onClick={() => toggleMessenger(true, user, conversation._id)}
    >
      <div className="topbarMessengerConversationImage">
        <img
          src={process.env.REACT_APP_BACKEND_URL + user.profilePicture}
          alt="profile"
        />
      </div>
      <div className="topbarMessengerConversationRight">
        <h4 className="topbarMessengerConversationUsername">
          {user.firstName} {user.lastName}
        </h4>
        <div className="topbarMessengerConversationRightBottom">
          <p className="topbarMessengerConversationMessage">
            Hello, im writing regards the message you have sent me
          </p>
          <span className="topbarMessengerConversationDate">9w</span>
        </div>
      </div>
    </div>
  );
}
